import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NetflixApp } from "../NetflixApp";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { DetailMovie } from "../screens/DetailMovie/DetailMovie";
import { SearchScreen } from "../screens/SearchScreen/SearchScreen";
import { SeriesScreen } from "../screens/SeriesScreen/SeriesScreen";
import { MovieScreen } from "../screens/MovieScreen/MovieScreen";
import { PopularScreen } from "../screens/PopularScreen/PopularScreen";
import { LoginScreen } from "../screens/Auth/LoginScreen";
import { RegisterScreen } from "../screens/Register/RegisterScreen";
import { ListScreen } from "../screens/ListScreen/ListScreen";
import { AuthContext } from "../context/authContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const DashboardRoutes = () => {
  const { user,setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        // console.log(uid, displayName, photoURL);
        if (displayName && photoURL) {
          setUser({
            displayName,
            photoURL,
            uid,
          });
        }
        setLoading(true);
      } else {
        // User is signed out
        setUser({
          displayName: "",
          photoURL: "",
          uid: "",
        });
        setLoading(false);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (loading) {
    return <h1 style={{ color: "#fff" }}>Cargando...</h1>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="detail/:movieId" element={<DetailMovie />} />
        <Route path="search/:movieSearch" element={<SearchScreen />} />
        <Route path="series" element={<SeriesScreen />} />
        <Route path="movies" element={<MovieScreen />} />
        <Route path="list" element={<ListScreen />} />
        <Route path="news-popular" element={<PopularScreen />} />
        <Route path="auth/login" element={<LoginScreen />} />
        <Route path="auth/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
