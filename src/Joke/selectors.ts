import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/storeTypes";
import { JokeType } from "./jokeSlice";

export const getJokes = (state: RootState): JokeType[] =>
  state.jokeReducer.jokesData;
export const getJokesLoading = (state: RootState): boolean =>
  state.jokeReducer.isLoading;

export const getJokesData = createSelector(
  getJokes,
  getJokesLoading,
  (jokes, isLoading) => ({
    jokes,
    isLoading,
  })
);
