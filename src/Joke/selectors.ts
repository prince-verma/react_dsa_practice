import { RootState } from "../store/storeTypes";

export const jokesDataSelectors = (state: RootState) => {
  return state.jokeReducer.jokesData;
};
