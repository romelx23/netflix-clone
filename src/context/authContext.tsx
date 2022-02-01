import { createContext, Dispatch, SetStateAction, useState } from "react";
interface Props{
    children:JSX.Element
}
export interface User{
    displayName: string,
    photoURL: string,
    uid:string
}
interface Context{
    user:User
    setUser:Dispatch<SetStateAction<User>>
}
export const AuthContext = createContext<Context>({
  user: {
    displayName: "",
    photoURL: "",
    uid:""
  },
  setUser: () => {},
});

export const AuthProvider = ({ children }:Props) => {
  const [user, setUser] = useState({
    displayName: "",
    photoURL: "",
    uid:""
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};