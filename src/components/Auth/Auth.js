import React, { useEffect, useContext } from "react";

import useFetchUsersAPI from "../hooks/useFetchUsersAPI";
import useChangeInputConfig from "../hooks/useAuth";

import { AuthContext } from "../context/AuthContext";

import "./Auth.css";

const Auth = (props) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      props.history.push("/home");
    }
  }, [user]);

  let isLogin = props.match.path === "/sign-in";
  let buttonTitle = isLogin ? "Login" : "Register";
  let apiURL = isLogin ? "/users/sign-in" : "/users/sign-up";

  const [
    { isLoading, response, error },
    handleAPICallButtonSubmit,
  ] = useFetchUsersAPI(apiURL);

  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage,
    cantSubmitEmail,
    clearEmailInput,
  ] = useChangeInputConfig("email");

  const [
    password,
    handlePasswordChange,
    isPasswordError,
    passwordErrorMessage,
    cantSubmitPassword,
    clearPasswordInput,
  ] = useChangeInputConfig("password");

  const [
    username,
    handleUsernameChange,
    isUsernameError,
    usernameErrorMessage,
    cantSubmitUsername,
    clearUsernameInput,
  ] = useChangeInputConfig("username");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = isLogin ? { email, password } : { email, username, password };

    handleAPICallButtonSubmit({
      method: "post",
      data: {
        ...user,
      },
    });

    clearEmailInput();
    clearPasswordInput();
    clearUsernameInput();
  };

  return (
    <form id="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        label="Email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={handleEmailChange}
      />{" "}
      <br />
      {!isLogin && (
        <input
          type="text"
          label="Username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      )}{" "}
      <br />
      <input
        type="password"
        label="Password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />{" "}
      <br />
      <button type="submit">{buttonTitle}</button>
    </form>
  );
};

export default Auth;
