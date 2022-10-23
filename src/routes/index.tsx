import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export function AppRoutes (): JSX.Element{
  const { setDrawerOptions } = useDrawerContext();

  //Garantir que passe somente uma vez
  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página Inicial'
      },
    ]);
  }, []);
  
  return (
    <Routes>
      <Route path="/pagina-inicial" element={
        <Dashboard/>
      }/>
      <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
    </Routes>
  );
}