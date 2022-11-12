import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Scope, FormHandles } from '@unform/core';


import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasServices';

interface IFormData{
  email: string;
  nomeCompleto: string;
  cidadeId: number;
}

export function DetalheDePessoas (){
  const { id = 'nova'} = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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

            formRef.current?.setData(result);
          }
        });
    }
  },[id]);

  const handleSave = (dados : IFormData) => {
    setIsLoading(true);

    if(id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
          }
          else{
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    }else{
      setIsLoading(true);

      PessoasService
        .updateById(Number(id),{id: Number(id), ...dados})
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
          }
        });
    }
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

          aoClicarEmSalvar={() => {formRef.current?.submitForm();}}
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

      <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>

        <VTextField placeholder='Nome' name='nomeCompleto' />
        <VTextField placeholder='Email' name='email' />
        <VTextField placeholder='Cidade' name='cidadeId' />
        
        {/* {[1, 2, 3, 4].map((_,index) =>(
          <Scope key="" path={`endereco[${index}]`}>
            <VTextField name='rua' />
            <VTextField name='numero' />
            <VTextField name='estado' />
            <VTextField name='cidade' />
            <VTextField name='pais' />
          </Scope>
        ))} */}

      </Form>

    </LayoutBaseDePagina>
  );
}