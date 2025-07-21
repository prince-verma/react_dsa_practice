import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "../Joke/jokeSlice";
import { logger } from "./loggerMiddleware";

export const store = configureStore({
  reducer: {
    jokeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
