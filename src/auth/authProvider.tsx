// Este va a ser un componente que va a usar useContexxt para guardar todo el estado y las funciones que vamos a necesitar a lo largo de toda nuestra aplicacion
// Este sera nuestro componente que va a estar validando constantement que exista autenticacion o no para dejar pasar a las rutas que estan protegidas y en general poder acceder a la informacion de nuestro usuario, que mandemos desde el backend
import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

// export
const AuthContext = createContext({
  isAuthenticated: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
