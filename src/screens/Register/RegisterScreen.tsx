import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/authContext";
import { useAuthRegister } from "../../hooks/useAuth";
import { useForm } from '../../hooks/useForm';
import "../Auth/LoginScreen.scss";

export const RegisterScreen = () => {
  const navigate = useNavigate();
  const { user} = useContext(AuthContext);
  const {authRegister}=useAuthRegister();

  const registro = {
    name: "", //Romel
    email: "", //rom@gmail.com
    password: "", //123456
    password2: "", //123456
  };
  const {values, handleInputChange} = useForm(registro);

  const { name, email, password, password2 } = values;

  const isFormValid = () => {
    if (name.trim().length === 0) {
      // dispatch(setError('name is required'))
      console.log("name is required");
      Swal.fire({
        title: "Nombre es Requerido",
        icon: "error",
      });
      return false;
    }
    // else if(!validator.isEmail(email)){
    //     dispatch(setError('Email is not valid'))
    //     console.log('Email is not valid');
    //     return false;
    // }
    else if (password !== password2 || password.length < 5) {
      // dispatch(setError('password should be at least 6 characters and match each other'))
      console.log(
        "password should be at least 6 characters and match each other"
      );
      Swal.fire({
        title: "La Contraseña debe ser mayor a 6 digitos",
        icon: "error",
      });
      if (password !== password2) {
        Swal.fire({
          title: "Las Contraseñas deben ser Iguales",
          icon: "error",
        });
      }
      return false;
    }
    // dispatch(removeError())
    return true;
  };

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log(name, email, password, password2);
    if (isFormValid()) {
      console.log("formulario correcto");
      authRegister(email, password, name);
      // dispatch(startRegisterWithEmailPasswordName(email,password,name));
    }
    // authLogin(email,password)
  };
  useEffect(() => {
    // console.log(user);
    if (user.displayName) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="auth__main">
      <div className="auth__content">
        <h3 className="auth__title">Register</h3>
        <form onSubmit={()=>handleRegister} className="form__register">
          {/* {
                    msgError && 
                    (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                    )
                } */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="auth__input"
            autoComplete="off"
            value={name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="auth__input"
            autoComplete="off"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Pasword..."
            name="password"
            className="auth__input"
            autoComplete="off"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Confirm Pasword"
            name="password2"
            className="auth__input"
            autoComplete="off"
            value={password2}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn__register">
            Register
          </button>
          <Link to={"/auth/login"} className="link">
            Already register?
          </Link>
        </form>
      </div>
    </div>
  );
};