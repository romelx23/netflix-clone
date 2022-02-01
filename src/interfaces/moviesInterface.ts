export interface movies {
  id:string;
  poster_path:string;
  backdrop_path:string;
  title:string;
  original_title:string;
  vote_average:number;
  popularity:number;
  overview:string;
  name:string;
  key:string
  genres:[
    {
      id:number,
      name:string
    }
  ]
}

export interface Movie {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export interface Search{
  page: number,
  results:movies[],
  total_pages:number,
  total_results: number
}

export interface moviesFirebase {
  id: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
}