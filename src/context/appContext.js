"use client"
import { createContext, useState } from "react";
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const val = {
    user,
    setUser,
  };
  return (
    <AppContext.Provider value={val}>{props.children}</AppContext.Provider>
  );
};
