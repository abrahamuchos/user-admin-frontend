import { createContext, useState, useContext } from "react";

//Only to Autocomplete purpose
const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  setToken: () => {
  },
  setUser: () => {
  },
  setNotification: () => {

  },
});

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState();

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setNotification = (message) =>{
    _setNotification(message);
    setTimeout(()=>{
      _setNotification(null);
    }, 5000)
  }

  return (
    <StateContext.Provider
      value={{
        user,
        setToken,
        token,
        setUser,
        notification,
        setNotification
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
