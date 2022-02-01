import React, { useContext, useEffect } from "react";
import { ListMovies } from "../../components/ListMovies/ListMovies";
import "./HomeScreen.scss";
import { Header } from '../../components/Header/Header';
import { useList } from "../../hooks/useList";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
export const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const movie=useList(user)
  const navigate=useNavigate()
  useEffect(() => {
    if(!user.uid){
      navigate('/auth/login')
    }
    return ()=>{
    }
  }, [navigate, user]);
  return (
    <>
        <Header />
      <div className="container__movies">
        <ListMovies />
      </div>
    </>
  );
};
