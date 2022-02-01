import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/authContext";
import { getMovies } from "../../helpers/searchMovies";
import { useIntersection } from "../../hooks/useNear";
import { movies } from "../../interfaces/moviesInterface";
import "./MovieScreen.scss";

export const MovieScreen = () => {
  const [movie, setMovie] = useState<movies[]>([]);
  useEffect(() => {
    getMovies().then((el) => {
      setMovie(el.results);
    });
  }, []);

  const container = useRef<HTMLDivElement>(null);
  const [pagecurrent, setPage] = useState(1);

  const getMoreMovies = async () => {
    if (isVisible) {
      const resp = await getMovies(pagecurrent);
      const { results } = resp;
      setMovie([...movie, ...results]);
      setPage(pagecurrent + 1);
    }
  };
  const isVisible = useIntersection(
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    },
    container
  );
  useEffect(() => {
    getMoreMovies();
  }, [isVisible]);

  //   console.log(pagecurrent);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user.displayName) {
      navigate("/auth/login");
    }
  }, [navigate, user]);

  return (
    <div className="container__series">
      <Navbar />
      <div className="content__cards">
        {movie.map((el) => {
          return <CardMovie key={el.id} item={el} />;
        })}
      </div>
      <div ref={container}></div>
      {isVisible ? (
        <img
          className="spinner"
          src="https://cutewallpaper.org/21/loading-gif-transparent-background/Incorrect-background-on-Lollipop-for-a-GIF-displayed-.gif"
          alt="spinner"
        />
      ) : (
        <></>
      )}
    </div>
  );
};
