import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

function PredictionChart({ results }) {
  if (!results) return null;

  const labels = ["Average", "LightGBM", "RandomForest", "XGBoost"];
  const values = [
    results.Average,
    results.LightGBM,
    results.RandomForest,
    results.XGBoost,
  ];

  const backgroundColors = [
    "rgba(255, 206, 86, 0.7)",   // 노랑
    "rgba(75, 192, 192, 0.7)",   // 청록
    "rgba(255, 99, 132, 0.7)",   // 빨강
    "rgba(54, 162, 235, 0.7)",   // 파랑
  ];

  const borderColors = backgroundColors.map(c => c.replace("0.7", "1"));

  const data = {
    labels,
    datasets: [
      {
        label: "전체 모델 평균",
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1.5,
        barPercentage: 0.6, // 🎯 막대 너비 조절
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#374151", // Tailwind gray-700
          font: {
            size: 14,
            weight: "500",
          },
          callback: (value) => `$${value.toLocaleString()}`,
        },
        grid: {
          color: "rgba(0,0,0,0.05)", // 연한 회색 라인
          borderDash: [5, 5],
        },
      },
      x: {
        ticks: {
          color: "#374151",
          font: {
            size: 14,
            weight: "500",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#111827", // Tailwind gray-900
          font: {
            size: 14,
            weight: "600",
          },
        },
      },
      tooltip: {
        backgroundColor: "#f9fafb",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#d1d5db",
        borderWidth: 1,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md h-[300px]">
      <Bar data={data} options={options} />
    </div>
  );
}

export default PredictionChart;
