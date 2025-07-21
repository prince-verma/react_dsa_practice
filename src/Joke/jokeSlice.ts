import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchRandomJoke } from "./useCases";

export type JokeType = {
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

// export interface JokeReducerState {
//   jokesData: JokeType[];
//   isLoading: boolean;
// }

// const initialState: JokeReducerState = jokeAdapter.getInitialState({
//   jokesData: [],
//   isLoading: false,
// });

export const jokesReducerAdapter = createEntityAdapter({
  selectId: (joke: JokeType) => joke.id,
  sortComparer: (a: JokeType, b: JokeType) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
});

export interface JokeReducerState
  extends ReturnType<typeof jokesReducerAdapter.getInitialState> {
  isLoading: boolean;
}

const initialState: JokeReducerState = jokesReducerAdapter.getInitialState({
  isLoading: false,
});

export const jokeSlice = createSlice({
  name: "jokeReducer",
  initialState,
  reducers: {
    deleteJoke: jokesReducerAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomJoke.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchRandomJoke.fulfilled,
        (state, action: PayloadAction<JokeType | null>) => {
          state.isLoading = false;
          if (action.payload) {
            jokesReducerAdapter.addOne(state, action.payload);
          }
        }
      )
      .addCase(fetchRandomJoke.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { deleteJoke } = jokeSlice.actions;
export default jokeSlice.reducer;
