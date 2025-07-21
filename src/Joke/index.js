import React, { useCallback, useState } from "react";
import "./index.css";
const getJoke = async () => {
  try {
    const url = "https://api.chucknorris.io/jokes/random";
    const data = await fetch(url);
    const joke = await data.json();
    console.log("data", joke);
    return joke.value;
  } catch (error) {
  }
};

function Joke() {
  const [joke, setJoke] = useState("");

  const handCtaClick = useCallback(async () => {
    const data = await getJoke();
    setJoke(data);
  }, []);

  return (
    <div className="jokeContainer">
      <button onClick={handCtaClick}>click me to get a joke</button>
      <div>
        {joke}
      </div>
    </div>
  );
}

export default Joke;
