import React from "react";
import PredictionChart from "./PredictionChart";

export default function PredictionResultModal({ result, onClose }) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
        <div className="flex items-center mb-6 gap-2">
          <span className="text-2xl">📊</span>
          <h3 className="text-2xl font-semibold text-gray-800">예측 결과</h3>
        </div>
        <div className="space-y-2 text-gray-700 text-lg mb-6">
          {Object.entries(result).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b pb-1">
              <span className="font-medium">{key}</span>
              <span>${value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border rounded-lg p-4 shadow-inner">
          <h4 className="text-md font-semibold mb-2">📈 모델별 예측 비교</h4>
          <PredictionChart results={result} />
        </div>
      </div>
    </div>
  );
}
