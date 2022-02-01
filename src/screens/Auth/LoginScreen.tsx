import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { authLogin, googleSignIn } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import "./LoginScreen.scss";

interface From {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { values, handleInputChange } = useForm<From>({
    email: "", //romx23@gmail.com
    password: "", //123456
  });
  const { email, password } = values;
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    // dispatch(startLoginEmailPassword(email,password))
    authLogin(email, password);
  };
  const handleGoogleLogin = () => {
    // dispatch(StartGooogleLogin());
    googleSignIn();
  };

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
      } else {
        // User is signed out
        setUser({
          displayName: "",
          photoURL: "",
          uid: "",
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user.displayName) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="auth__main">
      <div className="auth__content">
        <h3 className="auth__title">Login</h3>
        <form
          onSubmit={(e) => handleLogin(e)}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="auth__input"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Pasword..."
            name="password"
            className="auth__input"
            autoComplete="on"
            value={password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="btn__login"
            // disabled={loading}
          >
            Login
          </button>

          <div className="auth__social-network">
            <p>Login with social network</p>
            <div className="google-btn" onClick={handleGoogleLogin}>
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google button"
                />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
          </div>
          <Link to={"/auth/register"} className="link">
            Create new
          </Link>
        </form>
      </div>
    </div>
  );
};
