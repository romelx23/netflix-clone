import './Hero.scss'
import { useImage } from '../../hooks/useImage';
import { StarRaiting } from '../StartRaiting/StartRaiting';
import { Link } from 'react-router-dom';
export const Hero = () => {
  const movie = useImage()
  // console.log(movie);
  return (
    <div className='container__hero'>
      <div className="hero__description">
        <h1>{movie?.name ||movie?.title||movie?.original_title}</h1>
        <h2>
          {movie.overview}
        </h2>
        <h3>{movie.vote_average}</h3>
        <StarRaiting start={movie.vote_average}/>
        <div className="content__btns">
          <button className='btn btn__play'>
            <h2>Play</h2>
            <i className="fas fa-play"></i>
          </button>
          <Link to={`/detail/${movie.id}`} className='btn btn__info'>
            {/* <Link to={`/detail/${movie.id}`}> */}
            <h2>Info</h2>
            <i className="fas fa-info"></i>
            {/* </Link> */}
          </Link>
        </div>
      </div>
      <span className='shadow'></span>
    </div>
  );
};
