import React, { useContext, useEffect } from "react";
import "./ListScreen.scss";
import { AuthContext } from "../../context/authContext";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useList } from "../../hooks/useList";
import { CardList } from "../../components/CardList/CardList";

export const ListScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // const {list:movie} = useContext(ListContext);
  const { list: movie } = useList(user);
  useEffect(() => {}, [movie]);

  useEffect(() => {
    if (!user.displayName) {
      navigate("/auth/login");
    }
  }, [navigate, user]);

  return (
    <>
      <Navbar />
      <div className="container__list">
        <h1>Mi Lista</h1>
        <div className="content__cards">
          {movie.map((el) => {
            return <CardList key={el.id} item={el} />;
          })}
        </div>
      </div>
      ;
    </>
  );
};
