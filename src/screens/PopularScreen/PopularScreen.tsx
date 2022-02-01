import React, { useEffect, useRef, useState } from "react";
import { CardMovie } from "../../components/CardMovie/CardMovie";
import { Navbar } from "../../components/Navbar/Navbar";
import { getPopular } from "../../helpers/searchMovies";
import { movies } from "../../interfaces/moviesInterface";
import "./PopularScreen.scss";
import { useIntersection } from "../../hooks/useNear";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const PopularScreen = () => {
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState<movies[]>([]);
  const container = useRef<HTMLDivElement>(null);
  const [pagecurrent, setPage] = useState(1);
  useEffect(() => {
    getPopular().then((el) => {
      setMovie(el.results);
    });
  }, []);
  const getMorePopular = async () => {
    if (isVisible) {
      const resp = await getPopular(pagecurrent);
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
    getMorePopular();
  }, [isVisible]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user.uid) {
      navigate("/auth/login");
    }
    return () => {};
  }, [navigate, user]);
  //   console.log(pagecurrent);

  return (
    <>
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
    </>
  );
};
