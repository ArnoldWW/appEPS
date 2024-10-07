import { createContext, useEffect, useState } from "react";
import "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

const AuthContext = createContext();
const auth = getAuth();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // obtener usuario
  onAuthStateChanged(auth, (userData) => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }
  });

  /* crear usuario */
  const createUser = async (name, email, password) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name
      });

      setUser(userData);
      alert("Cuenta creada");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  /* iniciar sesión */
  const logIn = async (email, password) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      setUser(userData);
      alert("Sesión iniciada");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  /* cerrar sesión */
  const logOut = async () => {
    try {
      if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
        await signOut(auth);
        setUser(null);
        alert("Sesión cerrada");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        createUser,
        logIn,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
