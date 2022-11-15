import { createContext, useCallback, useContext, useState } from 'react';
interface IDrawerOption {
  icon : string,
  path : string,
  label : string,
  filhos ?: IDrawerOption[]
}

interface IDrawerContextData {
  isDrawerOpen: boolean,
  toggleDrawerOpen : () => void,
  drawerOptions: IDrawerOption[]
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}
interface IAppDrawerProviderProps{
  children: React.ReactNode
}


const DrawerContext = createContext({} as IDrawerContextData);

export function useDrawerContext (){
  return useContext(DrawerContext);
}


export function DrawerProvider ({ children } : IAppDrawerProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  //Abre e fecha o Drawer
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  },[]);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);


  return(
    <DrawerContext.Provider value={{ 
      isDrawerOpen, 
      drawerOptions, 
      toggleDrawerOpen, 
      setDrawerOptions: handleSetDrawerOptions
    }}>
      {children}
    </DrawerContext.Provider>
  );
}