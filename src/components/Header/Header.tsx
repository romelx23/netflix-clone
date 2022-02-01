import React from "react";
import "./Header.scss";
import { Navbar } from '../Navbar/Navbar';
import { Hero } from '../Hero/Hero';
import { useImage } from '../../hooks/useImage';

export const Header = () => {
  const movie=useImage()

  return (
    <header className="container__header" style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      width: '100%',
      height: '700px',
      objectFit: 'cover',
      backgroundPosition: 'center'
    }}>
      <Navbar />
      <Hero />
    </header>
  );
};
