import React, { useRef, useState } from 'react';
import './SeriesScreen.scss'
import { useEffect } from 'react';
import { getSeries } from '../../helpers/searchMovies';
import { Navbar } from '../../components/Navbar/Navbar';
import { movies } from '../../interfaces/moviesInterface';
import { CardMovie } from '../../components/CardMovie/CardMovie';
import { useIntersection } from '../../hooks/useNear';

export const SeriesScreen = () => {
    const [movie, setMovie] = useState<movies[]>([]);
    useEffect(() => {
      getSeries().then((el)=>{
          setMovie(el.results)
      })
    }, []);
    const container = useRef<HTMLDivElement>(null);
    const [pagecurrent, setPage] = useState(2);

    const getMorePopular=async()=>{
        if(isVisible){
            const resp=await getSeries(pagecurrent)
            const {results}=resp;
            setMovie([...movie,...results])
            setPage(pagecurrent+1)
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
      
    //   console.log(pagecurrent);
    
    
  return <div className='container__series'>
      <Navbar/>
      <div className="content__cards">
            {
                movie.map((el)=>{
                    return <CardMovie key={el.id} item={el}/>
                })
            }
      </div>
      <div ref={container}></div>
      {
          isVisible?<img className='spinner' src="https://cutewallpaper.org/21/loading-gif-transparent-background/Incorrect-background-on-Lollipop-for-a-GIF-displayed-.gif" alt="spinner" />:<></>
      }
  </div>;
};
