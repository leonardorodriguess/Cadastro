import { useEffect, useMemo, useState } from 'react';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { IListagemPessoa, pessoasService } from '../../shared/services/api/pessoas/PessoasServices';
import { FerramentasDaListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks/UseDebounce';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environment } from '../../shared/environment';

export function ListagemDePessoas (){
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCont] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      pessoasService.getAll(1, busca)
      
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error){
            alert(result.message);
          } else {
            console.log(result);
            setTotalCont(result.totalCount);
            setRows(result.data);
          
          }
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
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto'}}>
        <Table>
          <TableHead>

            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount  === 0 && !isLoading && (
            <caption>{ Environment.LISTAGEM_VAZIA }</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  ); 
}