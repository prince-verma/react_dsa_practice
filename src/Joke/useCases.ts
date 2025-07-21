import { JokeType } from "./jokeSlice";
import { createAppAsyncThunk } from "../store/storeTypes";
import { getJokesData, getJokesLoading } from "./selectors";

const getJoke = async (): Promise<JokeType | null> => {
  try {
    const url = "https://api.chucknorris.io/jokes/random";
    const data = await fetch(url);
    const joke = await data.json();
    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, 5000);
    });
    return joke;
  } catch (error) {
    return null;
  }
};

export const fetchRandomJoke = createAppAsyncThunk(
  "jokeReducer/fetchRandomJoke",
  async (): Promise<JokeType | null> => {
    const jokeData: JokeType | null = await getJoke();
    if (jokeData) {
      return jokeData;
    }
    return null;
  },
  {
    condition: (arg, thunkApi) => {
      const isLoading = getJokesLoading(thunkApi.getState());
      return !isLoading;
    },
  }
);
