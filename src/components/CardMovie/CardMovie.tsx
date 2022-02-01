import React from "react";
import { Link } from "react-router-dom";
import { movies } from "../../interfaces/moviesInterface";
import { StarRaiting } from "../StartRaiting/StartRaiting";

interface Props {
  item: movies;
}

export const CardMovie = ({ item }: Props) => {
  const { poster_path, name, title, vote_average, id } = item;

  return (
      <div className="card__movie">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : "https://bitsofco.de/content/images/2018/12/broken-1.png"
          }
          alt="poster"
        />
        <h2>{name || title}</h2>
        <h3>{vote_average}</h3>
        <StarRaiting start={vote_average} />
        <div className="content__btns__list">
        <Link className="btn__link__list" to={`/detail/${id}`}>Ver Más</Link>
        </div>
      </div>
  );
};
