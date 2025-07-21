import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type JokeType = {
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

interface JokeState {
  jokesData: JokeType[];
}

const initialState: JokeState = {
  jokesData: [],
};

export const jokeSlice = createSlice({
  name: "jokeReducer",
  initialState,
  reducers: {
    addJoke: (state: JokeState, action: PayloadAction<JokeType>) => {
      state.jokesData.push(action.payload);
    },
    deleteJoke: (state: JokeState, action: PayloadAction<string>) => {
      state.jokesData = state.jokesData.filter(
        (joke) => joke.id !== action.payload
      );
    },
  },
});

export const { addJoke, deleteJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
