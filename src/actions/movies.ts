import { types } from '../types/types';
import { movies } from '../interfaces/moviesInterface';
 
 export const loadMovies=(movies:movies[])=>(
    {
        type:types.moviesAdd,
        payload:{
            ...movies
        }
    }
 )

 export const filterMovies=(id:string,movies:movies[])=>(
     {
         type:types.moviesLoad,
         payload:movies.filter((el)=>el.id===id)
     }
 )