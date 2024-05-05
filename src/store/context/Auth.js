import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  getUser: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState();

  async function setToken(token) {
    await setAuthToken(token.tokenType + token.accessToken);
    console.log("Setting Token",authToken);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    setToken: setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
