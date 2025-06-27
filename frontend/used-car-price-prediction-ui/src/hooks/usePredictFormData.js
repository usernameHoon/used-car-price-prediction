import { useState, useEffect } from "react";
import axios from "axios";

export default function usePredictFormData(initialFormData) {
  const [formData, setFormData] = useState(initialFormData);
  const [options, setOptions] = useState({});
  const [modelOptions, setModelOptions] = useState([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8080/api/options")
      .then(res => setOptions(res.data))
      .catch(err => setOptions({}))
      .finally(() => setIsOptionsLoading(false));
  }, []);

  useEffect(() => {
    if (formData.manufacturer) {
      axios.get(`http://localhost:8080/api/models/${formData.manufacturer}`)
        .then(res => setModelOptions(res.data))
        .catch(() => setModelOptions([]));
    }
  }, [formData.manufacturer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "manufacturer" ? value : value,
      ...(name === "manufacturer" ? { model: "" } : {})
    }));
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value || value.toString().trim() === '') {
        setError(`❗ ${key} 값을 입력해 주세요.`);
        return false;
      }
    }
    for (const key of ['year', 'odometer']) {
      if (isNaN(Number(formData[key]))) {
        setError(`❗ ${key} 값은 숫자여야 합니다.`);
        return false;
      }
    }
    setError('');
    return true;
  };

  return {
    formData,
    setFormData,
    options,
    modelOptions,
    isOptionsLoading,
    error,
    setError,
    handleChange,
    validateForm
  };
}
