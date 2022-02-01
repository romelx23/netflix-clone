import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, getSimilar } from "../../helpers/searchMovies";
import "./DetailMovie.scss";
// import { useDispatch, useSelector } from 'react-redux';
// import { filterMovies } from '../../actions/movies';
import { movies } from "../../interfaces/moviesInterface";
import { Navbar } from "../../components/Navbar/Navbar";
import { StarRaiting } from "../../components/StartRaiting/StartRaiting";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { AuthContext } from "../../context/authContext";
import { addList, delList } from "../../hooks/useAuth";
import { ListContext } from "../../context/listContext";
import Swal from "sweetalert2";

export const DetailMovie = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { movieId } = useParams<string>();
  // console.log({ movieId });
  const [movie, setMovie] = useState<movies>();
  const [similar, setSimilar] = useState<movies[]>([]);
  const { list,setList } = useContext(ListContext);
  const repetido = list.filter((el) => el.id === movie?.id);

  const movieParam = async () => {
    const resp = await getMovie(`${movieId}`);
    setMovie(resp);
  };

  const addListFavorite = () => {
    if (movie) {
      const { id, backdrop_path, title, vote_average } = movie;
      const repetido = list.filter((el) => el.id === id);
      // console.log(repetido);
      if (repetido.length !== 0) {
        Swal.fire({
          title: "Ya esta en tu lista",
          icon: "info",
        });
      }
      if (repetido.length === 0) {
        addList(id, backdrop_path, title, vote_average, user.uid).catch((e)=>{
          console.log(e)
        })
        setList([...list,movie])
        console.log("presionado");
      }
    }
  };

  useEffect(() => {
    movieParam();
    getSimilar(movieId).then((el) => {
      // console.log(el);
      setSimilar(el.results);
    });
    window.scrollTo(0, 0);
  }, [movieId]);

  useEffect(() => {
    
  }, [repetido,setList]);
  

  useEffect(() => {
    if (!user.displayName) {
      navigate("/auth/login");
    }
  }, [navigate, user]);

  return (
    <div className="container__detail">
      <Navbar />
      {movie ? (
        <>
          <div
            className="content__hero"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
              width: "100%",
              height: "700px",
              objectFit: "contain",
              backgroundPosition: "center",
            }}
          >
            <div className="container__hero">
              <div className="hero__description details__description">
                <h1>{movie?.name || movie?.title || movie?.original_title}</h1>
                <h2>{movie?.overview}</h2>
                <div className="content__genres">
                  {movie?.genres.map((el) => {
                    return <h3>{el.name}</h3>;
                  })}
                </div>
                <h3>{movie?.vote_average}</h3>
                <StarRaiting key={movie.id} start={movie?.vote_average || 0} />
                <div className="content__btns">
                  <button className="btn btn__play">
                    <h2>Play</h2>
                    <i className="fas fa-play"></i>
                  </button>
                  {repetido.length === 0 ? (
                    <button className="btn btn__info" onClick={addListFavorite}>
                      <h2>Add List</h2>
                      <i className="fas fa-plus"></i>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <span className="shadow"></span>
            </div>
          </div>
          <h1 className="title">Resultados Similares</h1>
          <div className="content__cards">
            {similar ? (
              similar.map((el) => {
                return <CardMovie key={el.id} item={el} />;
              })
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
