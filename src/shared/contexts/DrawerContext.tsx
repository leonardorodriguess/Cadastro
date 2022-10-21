import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen : () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export function useDrawerContext (){
  return useContext(DrawerContext);
}

interface IAppDrawerProviderProps{
  children: React.ReactNode
}

export function DrawerProvider ({ children } : IAppDrawerProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  },[]);


  return(
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}