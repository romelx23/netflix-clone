import { Search } from '../interfaces/moviesInterface';
const key="92f5fb7291380dcff63ba5a523e4452d";
export const getMovie=async (movie_id:string)=>{
    const resp=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=en-US`)
    const data=await resp.json()
    console.log(data);
    return data;
  }

  export const searchMovies=async (movie:string,page:number=1)=>{
    const resp=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}&page=${page}&include_adult=false`)
    const data:Search=await resp.json()
    // console.log(data);
    return data;
  }

  export const getSeries=async (page:number=1)=>{
    const resp=await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)
    const data:Search=await resp.json()
    // console.log(data);
    return data;
  }

  export const searchSeries=async (movie:string,page:number=1)=>{
    const resp=await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=${page}&query=${movie}&include_adult=false`)
    const data:Search=await resp.json()
    // console.log(data);
    return data;
  }

  export const getMovies=async (page:number=1)=>{
    const resp=await fetch(`
    https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`)
    const data:Search=await resp.json()
    // console.log(data);
    return data;
  }

  export const getPopular=async (page:number=1)=>{
    const resp=await fetch(`
    https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`)
    const data:Search=await resp.json()
    // console.log(data);
    return data;
  }

  export const getSimilar=async (id:string='',page:number=1)=>{
    const resp=await fetch(`
    https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=${page}`)
    const data:Search=await resp.json()
    // console.log(data);
    return data;
  }