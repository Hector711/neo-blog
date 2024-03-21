import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse, AccessTokenResponse } from "src/types/types";
import { API_URL } from "./constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

// export
const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken ] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {}, []);

  async function requestNewAccessToken(refreshToken:string) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`,{
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        }
      })

      if (response.ok) {
        const json = await response.json() as AccessTokenResponse 
        if(json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      }
    } catch (error) {
      console.log(error);
    }

    }
  
  
  async function checkAuth() {
    if (accessToken) {
      
    } else {
      const token = getRefreshToken();
      if(token){

      }
    }
  }

  function getAccessToken() {
    return accessToken;
  }
  function getRefreshToken():string|null {
    const token = localStorage.getItem("token")
    if (token) {
      const {refreshToken} = JSON.parse(token)
      return refreshToken;
    }
    return null;
  }

  function saveUser(userData:AuthResponse) {
    setAccessToken(userData.body.accessToken);
    setRefreshToken(userData.body.refreshToken);

    localStorage.setItem("Token", JSON.stringify(userData.body.refreshToken));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
