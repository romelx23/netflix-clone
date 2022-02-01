import { useState } from "react";
import { movies } from '../interfaces/moviesInterface';

export const useTrailer=()=>{
    const [trailer, setTrailer] = useState("");
    const getMovie = async (search: string) => {
        const resp = await fetch(search);
        const data = await resp.json();
        if (data.results.length !== 0) {
          // console.log(data.results[0].key);
          const key = data.results[0].key;
          const yt_url = `https://www.youtube.com/embed/${key}`;
          // console.log(yt_url);
          setTrailer(yt_url);
        }
      };
    
      const handlesMovie = (movie: movies) => {
        const searchPath = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=92f5fb7291380dcff63ba5a523e4452d&language=en-US`;
        getMovie(searchPath);
       };
       return{
           handlesMovie,
           trailer
       }
}