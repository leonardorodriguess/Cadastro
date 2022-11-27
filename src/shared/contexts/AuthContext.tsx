
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/api/auth/AuthService';

interface IAuthContextData {
  logout: () => void; /* Promise quando conectar com o backend */
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>
}

interface IAuthProviderProps{
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export function AuthProvider ({ children } : IAuthProviderProps) {
  const [accessToken, setAcessToken] = useState<string>();

  useEffect(() => {
    const acessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (acessToken) {
      setAcessToken(JSON.parse(acessToken));
    } else {
      setAcessToken(undefined);
    }
  }, []);

  //funções passadas em contexto tem que ter callback para não prejudicar desempenho
  const handleLogin = useCallback(async (email: string, password: string) => {
    //dentro do use effect usar .then no lugar do await
    const result = await AuthService.auth(email, password);

    if(result instanceof Error) {
      return result.message;
    } else{
      //manter usuario logado
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.acessToken));
      return setAcessToken(result.acessToken);
    }
  }, []); 

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAcessToken(undefined);
  }, []); 

  const isAuthenticated = useMemo(() => 
    !!accessToken /* accessToken !== undefined */, 
  [accessToken]); 

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated, 
        login : handleLogin,
        logout: handleLogout, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);