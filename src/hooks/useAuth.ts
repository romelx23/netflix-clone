import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { doc, setDoc, collection, addDoc, deleteDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthRegister = () => {
  const { setUser, user } = useContext(AuthContext);
  const authRegister = (email: string, password: string, name: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.displayName) {
        } else {
          const photoURL =
            "https://res.cloudinary.com/react-romel/image/upload/v1617636275/n2c8uanoks7hjod45fjd.jpg";
          updateProfile(user, {
            displayName: name,
            photoURL,
          });
          setUser({
            displayName: name,
            photoURL,
            uid: user.uid,
          });
        }
        Swal.fire({
          icon: "success",
          title: "Correcto",
          text: "Se Registro correctamente...",
        });
      })
      .catch((error) => Swal.fire("Error", error.message, "error"));
  };
  // console.log(user);
  return {
    authRegister,
  };
};

export const authLogin = (email: string, password: string) => {
  const auth = getAuth();
  // const { setUser } = useContext(AuthContext);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // const {displayName,photoURL}=user;
      console.log(user.displayName);
      Swal.fire({
        icon: "success",
        title: "Correcto",
        text: "Se Logueo correctamente...",
      });
    })
    .catch((error) => {
      //   const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: "Error",
        icon: "error",
        text: `${errorMessage}`,
      });
    });
};

export const handleLogOut = () => {
  const auth = getAuth();
  signOut(auth);
};

export const addList = async (
  id: string,
  poster_path: string,
  title: string,
  vote_average: number,
  uid: string,
) => {
  const fecha = new Date();
  const doc=await addDoc(collection(db, `my_list/${uid}/list`), {
    id,
    poster_path,
    title,
    vote_average,
    date: fecha,
  });
  Swal.fire({
    title: "Añadido a Mi Lista",
    icon: "success",
  });
  return 
};

export const delList = async (
  uid: string,
  key:string
) => {
  await deleteDoc(doc(db, `my_list/${uid}/list/${key}`))
  .catch(e=>console.log(e));
};

export const googleSignIn = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const user = result.user;
        Swal.fire({
          title: "Logueo",
          icon: "success",
          text: "Se logueo correctamente",
        });
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Swal.fire({
      //   title:'Error',
      //   icon:'error',
      //   text:errorMessage
      // })
      console.log(errorCode, errorMessage, email, credential);
    });
};

export const updateProfileCurrent = async (
  displayName: string,
  photoURL: string
) => {
  const auth = getAuth();
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    })
      .then(() => {
        // Profile updated!
        Swal.fire({
          title: "Perfil Actualizado",
          icon: "success",
        });
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }
};
