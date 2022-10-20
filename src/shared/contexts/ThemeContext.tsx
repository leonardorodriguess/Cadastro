import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Box, ThemeProvider } from '@mui/material';
import { DarkTheme, LigthTheme } from "../themes";

interface IThemeContextData {
  themeName: 'dark' | 'ligth';
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export function useAppThemeContext (){
  return useContext(ThemeContext);
}

interface IAppThemeProviderProps{
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps>  = ({ children }) => {
  const [themeName, setThemeName] = useState<'dark' | 'ligth'>('ligth');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === 'ligth' ? 'dark' : 'ligth');
  },[]);

  const theme = useMemo(() => {
    if(themeName === 'ligth') return LigthTheme;

    return DarkTheme;

  },[themeName]);

  return(
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box 
          width="100vw" 
          height="100vh" 
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}