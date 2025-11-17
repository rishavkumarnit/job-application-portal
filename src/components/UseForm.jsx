import { useState } from "react";

export default function useForm(initialValues, validations) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateStep = (step) => {
    const validation = validations[step];
    if (!validation) return true;

    const newErrors = validation(values);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    validateStep,
    resetForm,
  };
}
