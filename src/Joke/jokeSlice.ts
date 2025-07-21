import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRandomJoke } from "./useCases";

export type JokeType = {
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

export interface JokeReducerState {
  jokesData: JokeType[];
  isLoading: boolean;
}

const initialState: JokeReducerState = {
  jokesData: [],
  isLoading: false,
};

export const jokeSlice = createSlice({
  name: "jokeReducer",
  initialState,
  reducers: {
    deleteJoke: (state: JokeReducerState, action: PayloadAction<string>) => {
      state.jokesData = state.jokesData.filter(
        (joke) => joke.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomJoke.pending, (state: JokeReducerState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchRandomJoke.fulfilled,
        (state: JokeReducerState, action: PayloadAction<JokeType | null>) => {
          state.isLoading = false;
          if (action.payload) {
            state.jokesData.push(action.payload);
          }
        }
      )
      .addCase(fetchRandomJoke.rejected, (state: JokeReducerState) => {
        state.isLoading = false;
      });
  },
});

export const { deleteJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
