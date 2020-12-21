import React, { useState } from "react";

import "./Auth.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form id="auth-form">
      <input
        type="text"
        label="Email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        label="Password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> {" "} <br />

      <button type="button">Submit</button>
    </form>
  );
};

export default Auth;
