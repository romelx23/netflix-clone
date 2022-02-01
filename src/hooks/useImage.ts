import axios from "axios";
import { useEffect, useState } from "react";
import { movies } from "../interfaces/moviesInterface";
import api from "./../api/api";

export const useImage = () => {
  const [movie, setMovie] = useState<movies>({
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
  });
  const fetchData = async () => {
    const resp = await axios.get(
      `https://api.themoviedb.org/3${api.fetchNetflixOriginals}`
    );
    const random = Math.floor(Math.random() + 3);
    // console.log(resp.data.results[random]);
    // console.log(Math.floor(Math.random()*resp.data.results.length-1));
    const elementRandom = resp.data.results[random];
    setMovie(elementRandom);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return movie;
};
