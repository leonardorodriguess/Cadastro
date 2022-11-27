import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErros} from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesServices';

interface IFormData{
  nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export function DetalheDeCidades (){
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

      CidadesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            setNome(result.nome);
            console.log(result);

            formRef.current?.setData(result);
          }
        });
    } else { 
      formRef.current?.setData({
        nome: '',
      });
    }
  },[id]);

  const handleSave = (dados : IFormData) => {
    
    formValidationSchema
      .validate(dados, { abortEarly : false})
      .then((dadosValidados) => {
      
        setIsLoading(true);
        if(id === 'nova') {
          CidadesService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);
    
              if(result instanceof Error) {
                alert(result.message);
              }
              else{
                if (isSaveAndClose()){
                  navigate('/cidades');
                }else{
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        }else{
          setIsLoading(true);
    
          CidadesService
            .updateById(Number(id),{id: Number(id), ...dadosValidados})
            .then((result) => {
              setIsLoading(false);
    
              if(result instanceof Error) {
                alert(result.message);
              } else{
                if (isSaveAndClose()){
                  navigate('/cidades');
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
      CidadesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso');
            navigate('/cidades');
          }

        });
    }
  };


  return(
    <LayoutBaseDePagina 
      titulo= {id !== 'nova' ? nome : 'Detalhe de cidade'}
      barraDeFerramentas = {
        <FerramentasDeDetalhe 
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== 'nova'}
          mostrarBotaoNovo={id !== 'nova'}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate('/cidades')}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
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
                  name='nome' 
                  disabled={isLoading} 
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>

      </VForm>

    </LayoutBaseDePagina>
  );
}