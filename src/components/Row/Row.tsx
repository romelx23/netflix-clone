import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { movies } from "../../interfaces/moviesInterface";
import "./Row.scss";
import { loadMovies } from '../../actions/movies';
const base_url = "https://image.tmdb.org/t/p/original";
interface Props {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<movies[]>([]);
  const [slide, setSlide] = useState(0);
  const [trailer, setTrailer] = useState("");
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
      setMovies(res.data.results);
      dispatch(loadMovies(movies))
      return res;
    };
    fetchData();
  }, [fetchUrl]);
  const direct = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    if (direct.current !== null) {
      // console.log(direct.current);
      let distance = direct.current.getBoundingClientRect().x - 50;
      if (direction === "rigth" && slide < 10) {
        setSlide(slide + 1);
        direct.current.style.transform = `translateX(${-350 + distance}px)`;
      } else if (direction === "left" && slide > 0) {
        setSlide(slide - 1);
        direct.current.style.transform = `translateX(${400 + distance}px)`;
      }
    }
  };
  // console.log(slide);
  // console.log(movies);

  const handleDetail = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    id: string
  ) => {
    navigate(`/detail/${id}`);
  };

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
    // if (trailer) {
    //   setTrailer('')
    // } else {
    const searchPath = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=92f5fb7291380dcff63ba5a523e4452d&language=en-US`;
    getMovie(searchPath);
    // }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="wrapper">
        <div className="btn__scroll left" onClick={() => handleScroll("left")}>
          <h2>{"<"}</h2>
        </div>
        <div className="row_posters" ref={direct}>
          {movies &&
            movies.map((movie: movies) => {
              const id = movie.id;
              return movie.backdrop_path ? (
                <img
                  key={movie.id}
                  loading="lazy"
                  onClick={() => handlesMovie(movie)}
                  onDoubleClick={(e) => handleDetail(e, id)}
                  className={`row-poster ${isLargeRow && "row-Posterlarge"}`}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                  alt={movie.name}
                />
              ) : (
                <div>
                  <h1>cargando...</h1>
                </div>
              );
            })}
        </div>
        <div
          className="btn__scroll rigth"
          onClick={() => handleScroll("rigth")}
        >
          <h2>{">"}</h2>
        </div>
      </div>
      {trailer.length !== 0 ? (
        <div className="content__video">
          <iframe
            width="560"
            height="315"
            src={trailer}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ) : (
        <>
        </>
      )}
    </div>
  );
};
