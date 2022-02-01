import { createContext, Dispatch, SetStateAction, useState } from "react";
import { movies } from "../interfaces/moviesInterface";
interface Props {
  children: JSX.Element;
}

interface ContextInterface {
  list: movies[];
  setList: Dispatch<SetStateAction<movies[]>>;
}

const initialState:movies={
    id: "",
    poster_path: "",
    backdrop_path: "",
    title: "",
    original_title: "",
    vote_average: 0,
    popularity: 0,
    overview: "",
    name: "",
    key:"",
    genres: [
      {
        id: 0,
        name: "",
      },
    ],
}

export const ListContext = createContext<ContextInterface>({
  list: [{
    ...initialState
  }],
  setList: () => {},
});

export const ListProvider = ({ children }: Props) => {
  const [list, setList] = useState<movies[]>([{
    ...initialState
  }]);

  return (
      <ListContext.Provider
        value={{
          list,
          setList,
        }}
      >
        {children}
      </ListContext.Provider>
  );
};
