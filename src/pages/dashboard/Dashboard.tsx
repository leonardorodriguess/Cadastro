import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export function Dashboard (){
  return (
    <LayoutBaseDePagina 
      titulo='Página Inicial'
      barraDeFerramentas={(
        <BarraDeFerramentas 
          mostrarInputBusca
        />
      )}
    >
      Testando
    </LayoutBaseDePagina>
  );
}