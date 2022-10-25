import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListagemDePessoas } from '../pages';
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
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas'
      },
    ]);
  }, []);
  
  return (
    <Routes>

      <Route path="/pagina-inicial" element={<Dashboard/>}/>

      <Route path="/pessoas" element={<ListagemDePessoas/>}/>
      {/* <Route path="/pessoas" element={<ListagemDePessoas/>}/> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
    </Routes>
  );
}