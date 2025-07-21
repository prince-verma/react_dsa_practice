import React, { useCallback } from "react";
import "./index.css";
import { deleteJoke } from "./jokeSlice";
import type { JokeType } from "./jokeSlice";
import { getJokesData } from "./selectors";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import { fetchRandomJoke } from "./useCases";

function Joke() {
  const { jokes, isLoading }: { jokes: JokeType[], isLoading: boolean } = useAppSelector(getJokesData)
  const dispatch = useAppDispatch()
  const handCtaClick = useCallback(async () => {
    dispatch(fetchRandomJoke())
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
      {isLoading ? <div>Loading...</div> : null}
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
