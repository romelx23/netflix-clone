import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../config/firebase";
import { movies } from "../interfaces/moviesInterface";
import { ListContext } from '../context/listContext';

export const useData = () => {
  const [movie, setMovie] = useState<movies[]>([]);
  // const { list,setList } = useContext(ListContext);
  const obetenerData = async (id: string) => {
    const post: movies[] = [];
    const postcollection = query(collection(db, `my_list/${id}/list`));
    onSnapshot(postcollection, (docs) => {
      docs.forEach((doc) => {
        //   console.log(doc.data());
        post.push({
          ...(doc.data() as movies),
          key:doc.id
        });
      });
      setMovie(post);
    });
    // setList([...list,...movie])
    //   console.log(post);
  };
  // console.log(movie);
  return {
    movie,
    obetenerData,
  };
};
