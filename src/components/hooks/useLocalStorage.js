import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue = "") => {
  const [jwtTokenValue, setJwtTokenValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, jwtTokenValue);
  }, [jwtTokenValue, setJwtTokenValue]);

  const jwtDecodeFunc = (token) => {
    return jwtDecode(token);
  };

  return [jwtTokenValue, setJwtTokenValue, jwtDecodeFunc];
};

export default useLocalStorage;
