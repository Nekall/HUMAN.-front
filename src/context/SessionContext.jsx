import React, { createContext, useState } from 'react';

export const SessionContext = createContext();

const SessionContextProvider = (props) =>  {
  let saveSession = localStorage.getItem("human.__session");

  saveSession === null ? saveSession = false : saveSession = JSON.parse(saveSession);

  let [session, setSession] = useState(saveSession);

  const toggleSession = (state) => {
    localStorage.setItem("human.__session", state);
    if(state === false){
      localStorage.removeItem("human.__token");
      localStorage.removeItem("human.__userId");
    }
  }

  return (
    <SessionContext.Provider value={{session, toggleSession}}>
      {props.children}
    </ SessionContext.Provider>
  )
}

export default SessionContextProvider;
