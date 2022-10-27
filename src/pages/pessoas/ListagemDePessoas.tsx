import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { pessoasService } from '../../shared/services/api/pessoas/PessoasServices';
import { useDebounce } from '../../shared/hooks/UseDebounce';

export function ListagemDePessoas (){
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      pessoasService.getAll(1, busca)
        .then((result) => {
          if(result instanceof Error){
            alert(result.message);
            return;
          }
          console.log(result);
        });

    });
  }, [busca]);

  return (
    <LayoutBaseDePagina 
      titulo='Listagem de pessoas'
      barraDeFerramentas = {
        <FerramentasDaListagem
          mostrarInputBusca 
          textoBotaoNovo='Nova'
          textoDaBusca={searchParams.get('busca') ?? ''}
          aoMudarTextoDeBusca={texto => setSearchParams({busca : texto}, { replace: true})}
        />
      }
    >


    </LayoutBaseDePagina>
  ); 
}