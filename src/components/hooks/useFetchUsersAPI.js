import { useState, useEffect, useContext } from "react";
import axios from "axios";

import useLocalStorage from "./useLocalStorage";

import { AuthContext } from "../context/AuthContext";

const useFetchUsersAPI = (url) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "DEPLOYED ADDRESS example: https:overlord.com/api";

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [error, setError] = useState(null);

  const [options, setOptions] = useState({});
  const [isMessageOpen, setIsMessageOpen] = useState(true);

  const [jwtTokenValue, setJwtTokenValue, jwtDecodeFunc] = useLocalStorage(
    "jwtToken"
  );

  const { dispatch } = useContext(AuthContext);

  const handleMessageOpen = () => {
    setIsMessageOpen(true);
  };

  const handleMessageClose = () => {
    setError(null);
    setResponse(null);
    setIsMessageOpen(false);
  };

  const handleAPICallButtonSubmit = (option = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  const handleAPIFetchCall = async () => {
    const requestOptionObj = {
      ...options,
      ...{
        headers: {
          authorization: null,
        },
      },
    };

    try {
      handleMessageOpen();
      let response = await axios(baseURL + url, requestOptionObj);

      console.log(response);

      if (response.data.jwtToken) {
        setJwtTokenValue(response.data.jwtToken);
        let decoded = jwtDecodeFunc(response.data.jwtToken);
        dispatch({
          type: "LOGIN",
          user: decoded,
        });
      }

      setResponse(response.data.message);
      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    handleAPIFetchCall();
  }, [isLoading, url, options, baseURL]);

  return [
    { isLoading, response, error, setError, setResponse },
    handleAPICallButtonSubmit,
    isMessageOpen,
    handleMessageOpen,
    handleMessageClose,
  ];
};

export default useFetchUsersAPI;
