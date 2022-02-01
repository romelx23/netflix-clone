import React from 'react';
import api from '../../api/api';
import { Row } from '../Row/Row';

export const ListMovies = () => {
    return (
        <div>
            <Row 
            title="NETFLIX ORIGINALS" 
            fetchUrl={api.fetchNetflixOriginals} 
            isLargeRow 
            />
            <Row
            title="Trending Now" 
            fetchUrl={api.fetchTrending} 
            />
            <Row
            title="Top Rated" 
            fetchUrl={api.fetchRated} 
            />
            <Row
            title="Actions Movies" 
            fetchUrl={api.fetchActionMovies} 
            />
            <Row
            title="Comedy Movies" 
            fetchUrl={api.fetchComedyMovies} 
            />
            <Row
            title="Horror Movies" 
            fetchUrl={api.fetchHorrorMovies} 
            />
            <Row
            title="Romance Movies" 
            fetchUrl={api.fetchRomanceMovies} 
            />
            <Row
            title="Documentaries" 
            fetchUrl={api.fetchDocumentaries} 
            />
        </div>
    )
}
