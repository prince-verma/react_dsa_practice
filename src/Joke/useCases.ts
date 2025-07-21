import { JokeType } from "./jokeSlice";
import { createAppAsyncThunk } from "../store/storeTypes";
import { getJokesLoading } from "./selectors";
import { config } from "../config";

const getJoke = async (): Promise<JokeType | null> => {
  try {
    const url = `${config.baseUrl}/joke`;
    const data = await fetch(url);
    const { data: joke } = await data.json();
    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, 1000);
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
