import { useState } from "react";

const useChangeInputConfig = (inputType) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cantSubmit, setCantSubmit] = useState(true);

  const onChange = (e) => {
    let targetValue = e.target.value;

    setValue(targetValue);
    checkInput(value);
  };

  const clearInput = () => {
    setValue("");
  };

  const checkInput = (value) => {
    if (value.length === 0) {
      setIsError(true);
      setErrorMessage(`${inputType} is required`);
      setCantSubmit(true);
    } else {
      setIsError(false);
      setCantSubmit(false);
      setErrorMessage(``);
    }
  };

  return [value, onChange, isError, errorMessage, cantSubmit, clearInput];
};

export default useChangeInputConfig;
