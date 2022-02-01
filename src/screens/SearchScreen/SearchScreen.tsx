import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { StarRaiting } from "../../components/StartRaiting/StartRaiting";
import { searchMovies } from "../../helpers/searchMovies";
import { movies } from "../../interfaces/moviesInterface";
import "./SearchScreen.scss";
import { CardMovie } from '../../components/CardMovie/CardMovie';
import { useIntersection } from "../../hooks/useNear";
export const SearchScreen = () => {
  const { movieSearch } = useParams();
  const [movie, setMovie] = useState<movies[]>([]);
  console.log(movieSearch);
  useEffect(() => {
    if (movieSearch) {
      searchMovies(movieSearch).then((el) => {
        const firstfive = el.results;
        setMovie(firstfive);
      });
    }
  }, [movieSearch]);
  console.log(movie);
  const container = useRef<HTMLDivElement>(null);
    const [pagecurrent, setPage] = useState(1);

    const getMorePopular=async()=>{
        if(isVisible){
          if (movieSearch) {
            const resp=await searchMovies(movieSearch,pagecurrent)
            const {results}=resp;
            setMovie([...movie,...results])
            setPage(pagecurrent+1)
          }
        }
    }
    const isVisible = useIntersection(
        {
          root: null,
          rootMargin: "0px",
          threshold: 1,
        },
        container
      );
      useEffect(() => {
        getMorePopular()
      }, [isVisible]);
  return (
    <>
      <Navbar />
    <div className="container__search__screen">
      <div className="content__cards">
        {movie.map((el) => {
          return (
            <CardMovie key={el.id} item={el}/>
          );
        })}
      </div>
    </div>
    </>
  );
};
