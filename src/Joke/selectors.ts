import { createSelector, EntityId } from "@reduxjs/toolkit";
import { RootState } from "../store/storeTypes";
import { type JokeType } from "./jokeSlice";

export const getJokes = (state: RootState): Record<EntityId, JokeType> =>
  state.jokeReducer.entities as Record<EntityId, JokeType>;
export const getJokesLoading = (state: RootState): boolean =>
  state.jokeReducer.isLoading;

export const getJokesData = createSelector(
  getJokes,
  getJokesLoading,
  (jokes, isLoading) => ({
    jokes: Object.values(jokes),
    isLoading,
  })
);
