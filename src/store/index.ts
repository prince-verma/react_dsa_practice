import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "../Joke/jokeSlice";

export const store = configureStore({
  reducer: {
    jokeReducer,
  },
});
