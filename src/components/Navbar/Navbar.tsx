import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { handleLogOut } from "../../hooks/useAuth";
import { Search } from "../Search/Search";
import "./Navbar.scss";
interface Props {}

export const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [look, setLook] = useState(false);
  const [log, setLog] = useState(false);
  const detectScroll = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", detectScroll);
    return () => {
      window.removeEventListener("scroll", detectScroll);
    };
  }, []);
  const showSearch = () => {
    setLook(!look);
  };
  const showRegister = () => {
    setLog(!log);
  };
  return (
    <nav className={show ? "show" : ""}>
      <div className="nav__items">
        <Link to={"/"}>
          <img
            src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Netflix.png"
            alt="logo"
          />
        </Link>
        <div className="content__items">
          <Link to={"/"}>
            <h2>Homepage</h2>
            <i className="fas fa-home"></i>
          </Link>
          <Link to={"/series"}>
            <h2>Series</h2>
            <i className="fas fa-tv"></i>
          </Link>
          <Link to={"/movies"}>
            <h2>Movies</h2>
            <i className="fas fa-ticket-alt"></i>
          </Link>
          <Link to={"/news-popular"}>
            <h2>New and Popular</h2>
            <i className="fas fa-fire-alt"></i>
          </Link>
          <Link to={"/list"}>
            <h2>My List</h2>
            <i className="far fa-bookmark"></i>
          </Link>
        </div>
      </div>
      {look ? <Search /> : <></>}
      <div className="user__items">
        <i className="fas fa-search" onClick={showSearch}></i>
        <i className="fas fa-bell"></i>
        <img src={user.photoURL} alt="avatar" />
        <i className="fas fa-chevron-down" onClick={showRegister}></i>
      </div>
      {log ? (
        <div className="card__auth">
          {user ? (
            <button className="fass" onClick={handleLogOut}>Salir<i className="fas fa-sign-out-alt"></i></button>
          ) : (
            <Link to={"/auth/login"}>Login</Link>
          )}
          <Link to={"/auth/register"}>Register</Link>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};
