import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErros} from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasServices';
import { AutoCompleteCidades } from './components/AutoCompleteCidades';

interface IFormData{
  email: string;
  nomeCompleto: string;
  cidadeId: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required()
});

export function DetalheDePessoas (){
  const { id = 'nova'} = useParams<'id'>();
  const navigate = useNavigate();

  const { 
    formRef, 
    save,
    // saveAndNew,
    saveAndClose,
    // isSaveAndNew,
    isSaveAndClose
  } = useVForm();

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
    } else { 
      formRef.current?.setData({
        email: '',
        nomeCompleto: '',
        cidadeId: undefined,
      });
    }
  },[id]);

  const handleSave = (dados : IFormData) => {
    
    formValidationSchema
      .validate(dados, { abortEarly : false})
      .then((dadosValidados) => {
      
        setIsLoading(true);
        if(id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);
    
              if(result instanceof Error) {
                alert(result.message);
              }
              else{
                if (isSaveAndClose()){
                  navigate('/pessoas');
                }else{
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        }else{
          setIsLoading(true);
    
          PessoasService
            .updateById(Number(id),{id: Number(id), ...dadosValidados})
            .then((result) => {
              setIsLoading(false);
    
              if(result instanceof Error) {
                alert(result.message);
              } else{
                if (isSaveAndClose()){
                  navigate('/pessoas');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErros = {};
        
        errors.inner.forEach(error => {
          if(!error.path) return;

          validationErrors[error.path] = error.message;
        });
        
        formRef.current?.setErrors(validationErrors);
        // console.log(errors.inner);
      });

    /* if(dados.nomeCompleto.length < 3){
      formRef.current?.setFieldError('nomeCompleto', 'O campo precisa ser preenchido.');
      setIsLoading(false);
      return;
    } */

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

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={(dados) => handleSave(dados)}>

        <Box 
          margin={1} 
          display="flex" 
          flexDirection="column" 
          component={Paper} 
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading &&(
              <Grid item>
                <LinearProgress variant="indeterminate"/>
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                <VTextField 
                  fullWidth 
                  label='Nome' 
                  name='nomeCompleto' 
                  disabled={isLoading} 
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                <VTextField 
                  fullWidth 
                  label='Email' 
                  name='email' 
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
                {/* <VTextField 
                  fullWidth 
                  label='Cidade' 
                  name='cidadeId' 
                  disabled={isLoading}
                /> */}
                <AutoCompleteCidades isExternalLoading={isLoading} />
              </Grid>
            </Grid>

          </Grid>
        </Box>
        
        {/* {[1, 2, 3, 4].map((_,index) =>(
          <Scope key="" path={`endereco[${index}]`}>
            <VTextField name='rua' />
            <VTextField name='numero' />
            <VTextField name='estado' />
            <VTextField name='cidade' />
            <VTextField name='pais' />
          </Scope>
        ))} */}

      </VForm>

    </LayoutBaseDePagina>
  );
}