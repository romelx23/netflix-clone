import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { movies } from "../../interfaces/moviesInterface";
import { StarRaiting } from "../StartRaiting/StartRaiting";
import { delList } from "../../hooks/useAuth";
import { ListContext } from "../../context/listContext";
import Swal from "sweetalert2";

interface Props {
  item: movies;
}

export const CardList = ({ item }: Props) => {
  const { poster_path, name, title, vote_average, id } = item;
  const { user } = useContext(AuthContext);
  const { list, setList } = useContext(ListContext);
  const delListFavorite = () => {
    const repetido = list.filter((el) => el.id !== id);
    setList([...repetido]);
    delList(user.uid, item.key);
    Swal.fire({
      title: "Borrado de Tú Lista",
      icon: "success",
    });
    console.log(user.uid, item.key);
  };

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
        <Link className="btn__link__list" to={`/detail/${id}`}>
          Ver Más
        </Link>
        <button className="btn btn__info" onClick={delListFavorite}>
          <h2>Delete List</h2>
          <i className="fas fa-minus"></i>
        </button>
      </div>
    </div>
  );
};
