import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasServices';

export function DetalheDePessoas (){
  const { id = 'nova'} = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if(id !== 'nova'){
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
          }
        });
    }
  },[id]);

  const handleSave = () => {
    console.log('Save');
  };

  const handleDelete = ( id : number) => {
    if(confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/pessoas');
          }

        });
    }
  };


  return(
    <LayoutBaseDePagina 
      titulo= {id !== 'nova' ? nome : 'Detalhe de pessoa'}
      barraDeFerramentas = {
        <FerramentasDeDetalhe 
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}

          aoClicarEmSalvar={() => {handleSave;}}
          aoClicarEmSalvarEFechar={() => {handleSave;}}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      {isLoading && (
        <LinearProgress variant='indeterminate' />
      )}
      <p>DetalheDePessoas {id}</p>
    </LayoutBaseDePagina>
  );
}