import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from '../pages';
import { DetalheDeCidades } from '../pages/cidades/DetalheDeCidades';
import { ListagemDeCidades } from '../pages/cidades/ListagemDeCidades';
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
        icon: 'location_city',
        path: '/cidades',
        label: 'Cidades'
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
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}/>
      
      <Route path="/cidades" element={<ListagemDeCidades/>}/>
      <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>}/>

      <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
    </Routes>
  );
}