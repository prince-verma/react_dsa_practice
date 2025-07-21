import React, { useCallback } from "react";
import "./index.css";
import { addJoke, deleteJoke } from "./jokeSlice";
import type { JokeType } from "./jokeSlice";
import { jokesDataSelectors } from "./selectors";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";

const getJoke = async (): Promise<JokeType | null> => {
  try {
    const url = "https://api.chucknorris.io/jokes/random";
    const data = await fetch(url);
    const joke = await data.json();
    console.log("data", joke);
    return joke;
  } catch (error) {
    return null;
  }
};

function Joke() {
  const jokes: JokeType[] = useAppSelector(jokesDataSelectors)
  const dispatch = useAppDispatch()
  const handCtaClick = useCallback(async () => {
    const data: JokeType | null = await getJoke();
    if (data) {
      dispatch(addJoke(data))
    }
  }, [dispatch]);

  const handleJokeDelete = useCallback(
    (id: string) => () => {
      dispatch(deleteJoke(id))
    },
    [dispatch],
  )


  return (
    <div className="jokeContainer">
      <button onClick={handCtaClick}>click me to get a joke</button>
      {
        jokes.map((joke: JokeType) => {
          return (
            <div className="jokeCard" key={joke.id}>
              <div className="jokeText">{joke.value}</div>
              <button onClick={handleJokeDelete(joke.id)}>delete joke</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default Joke;
