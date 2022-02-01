import React, { useEffect, useState } from "react";
import { searchMovies } from "../../helpers/searchMovies";
import { useForm } from "../../hooks/useForm";
import "./Search.scss";
import { movies } from "../../interfaces/moviesInterface";
import { Link } from "react-router-dom";
import { StarRaiting } from "../StartRaiting/StartRaiting";
interface FormData {
  search: string;
  email: string;
}
const base_url = "https://image.tmdb.org/t/p/original";
export const Search = () => {
  const [movie, setMovie] = useState<movies[]>([]);
  const { values, handleInputChange } = useForm<FormData>({
    search: "",
    email: "",
  });
  const { search } = values;
  const searchMovie = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(search).then((el) => {
      // console.log(el);
      // if (movie.length !== 0) {
      const firstfive = el.results.slice(0, 5);
      setMovie(firstfive);
      // }
    });
  };
  // console.log(movie);
  useEffect(() => {
      if(movie.length===0){
        setMovie([]);
      }
  }, []);
  

  return (
    <div className="content__search">
      <form onSubmit={searchMovie}>
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          placeholder="Busque su pelicula"
          onChange={handleInputChange}
        />
      </form>
      <li className="content__search__items">
        {movie.map((item) => {
          return (
            <ul className="card__search" key={item.id}>
              <img src={`${base_url}${item.poster_path}`} alt="poster" />
              <div className="content__description">
                <h3>{item.name || item.title}</h3>
                <h3>{item.vote_average}</h3>
                <StarRaiting start={item.vote_average}/>
                <Link to={`/detail/${item.id}`}>ver más</Link>
              </div>
            </ul>
          );
        })}
        {
          movie.length!==0?<Link className="link" to={`/search/${search}`} >ver todos los resultados</Link>:<></>
        }
      </li>
    </div>
  );
};
