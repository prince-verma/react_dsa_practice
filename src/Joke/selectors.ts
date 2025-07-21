import { RootState } from "../store/storeTypes";

export const getJokesData = (state: RootState) => {
  return {
    jokes: state.jokeReducer.jokesData,
    isLoading: state.jokeReducer.isLoading,
  };
};
