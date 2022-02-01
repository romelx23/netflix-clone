import { types } from "../types/types";
import { movies } from "../interfaces/moviesInterface";

interface Props {
  movies: movies[];
}
interface Actions {
  type: string;
  payload: {};
}
const initialState: Props = {
  movies: [],
};

export const moviesReducer = (
  state = initialState,
  { type, payload }: Actions
) => {
  switch (type) {
    case types.moviesLoad:
      return { ...state, ...payload };
    case types.moviesFilter:
      return { ...state, ...payload };
    default:
      return state;
  }
};
