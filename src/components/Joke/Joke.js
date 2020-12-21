import React, { useState } from "react";

import "./Joke.css";

const Joke = () => {
  const [joke, setJoke] = useState(
    "Welcome to the joke generator. I'll tell ya some punny jokes."
  );

  const [setup, setSetup] = useState("");
  const [isTwoParter, setIsTwoParter] = useState(false);

  const fetchJoke = async () => {
    try {
      const response = await fetch(
        `https://sv443.net/jokeapi/v2/joke/Pun?blacklistFlags=nsfw,political,racist,sexist`
      );

      const data = await response.json();

      if (data.error) {
        throw "An error occurred.";
      }

      if (data.type === "twopart") {
        setIsTwoParter(true);
        setSetup(data.setup);
        setJoke(data.delivery);
      } else {
        setIsTwoParter(false);
        setSetup("");
        setJoke(data.joke);
      }

      console.log(data);
    } catch (e) {}
  };

  return (
    <div id="joke-container">
      {isTwoParter ? setup : ""}
      <p>{joke}</p>
      <button onClick={fetchJoke}>Get Joke</button>
    </div>
  );
};

export default Joke;
