import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase_utils";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const signUp = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unSubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser: currentUser,
    signUp: signUp,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
