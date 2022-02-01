import { ListContext } from "./../context/listContext";
import { useContext, useEffect } from "react";
import { useData } from "../helpers/loadList";
import { User } from "../context/authContext";

export const useList = (user: User) => {
  const { obetenerData, movie } = useData();
  const { list, setList } = useContext(ListContext);
  // console.log(user);
  useEffect(() => {
    obetenerData(user.uid);
  }, []);
  useEffect(() => {
    setList(movie);
  }, [movie]);
  return {
    list,
  };
};
