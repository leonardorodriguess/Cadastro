import { LayoutBaseDePagina } from '../../shared/layouts';

export function Dashboard (){
  return (
    <LayoutBaseDePagina 
      titulo='Página Inicial'
      barraDeFerramentas={<>Barra de ferramentas</>}
    >
      Testando
    </LayoutBaseDePagina>
  );
}