import React, { useState, useEffect } from "react";
import axios from "axios";
import usePredictFormData from "../hooks/usePredictFormData";
import { FormInput, FormSelect } from "./FormFields";
import PredictionResultModal from "./PredictionResultModal";

function PredictForm() {
  const initialFormData = {
    year: 2015,
    odometer: 120000,
    manufacturer: "",
    model: "",
    condition: "fair",
    cylinders: "6 cylinders",
    fuel: "gas",
    transmission: "automatic",
    drive: "4wd",
    type: "pickup",
    paint_color: "blue",
  };

  const {
    formData,
    setFormData,
    options,
    modelOptions,
    isOptionsLoading,
    error,
    setError,
    handleChange,
    validateForm,
  } = usePredictFormData(initialFormData);

  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/predict", formData);
      setResult(response.data);
      setShowModal(true);
    } catch (err) {
      setError("예측 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-10 relative">
      <h2 className="text-2xl font-bold mb-10 text-center">🚗 중고차 가격 예측</h2>

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10 justify-center items-start">
        {isOptionsLoading ? (
          <p className="text-gray-500 mb-6">⚙️ 옵션 정보를 불러오는 중입니다...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4 max-w-md w-full bg-white p-6 rounded shadow"
          >
            {Object.keys(formData).map((key) => {
              const label = key.replace("_", " ");
              if (key === "model") {
                return (
                  <FormSelect
                    key={key}
                    label={label}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    options={modelOptions}
                    disabled={!formData.manufacturer}
                  />
                );
              } else if (options[key]) {
                return (
                  <FormSelect
                    key={key}
                    label={label}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    options={options[key]}
                  />
                );
              } else {
                return (
                  <FormInput
                    key={key}
                    label={label}
                    name={key}
                    type={["year", "odometer"].includes(key) ? "number" : "text"}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                );
              }
            })}

            <button
              type="submit"
              className="col-span-2 flex justify-center items-center gap-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                  </svg>
                  예측 중...
                </>
              ) : (
                "예측하기"
              )}
            </button>
          </form>
        )}
      </div>

      {error && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 p-4 rounded shadow">
          {error}
        </div>
      )}

      {showModal && result && (
        <PredictionResultModal result={result} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default PredictForm;
