import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesServices';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasServices';

export function Dashboard (){

  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  
  const [totalContCidades, setTotalContCidades] = useState<number>(0);
  const [totalContPessoas, setTotalContPessoas] = useState<number>(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);
    
    CidadesService.getAll(1)
    
      .then((result) => {
        setIsLoadingCidades(false);

        if(result instanceof Error){
          alert(result.message);
        } else {
          setTotalContCidades(result.totalCount);
        }
      });
    
    PessoasService.getAll(1)
    
      .then((result) => {
        setIsLoadingPessoas(false);

        if(result instanceof Error){
          alert(result.message);
        } else {
          setTotalContPessoas(result.totalCount);
        }
      });


  }, []);

  return (
    <LayoutBaseDePagina 
      titulo='Página Inicial'
      barraDeFerramentas={(
        <FerramentasDaListagem
          mostrarBotaoNovo={false}
        />
      )}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de pessoas
                  </Typography>

                  <Box padding={6} 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                  > 
                    {!isLoadingPessoas && (
                      <Typography variant='h1'>
                        {totalContPessoas}
                      </Typography>
                    )}

                    {isLoadingPessoas && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>

                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de cidades
                  </Typography>

                  <Box padding={6} 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                  > 
                    {!isLoadingCidades && (
                      <Typography variant='h1'>
                        {totalContCidades}
                      </Typography>
                    )}

                    {isLoadingCidades && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>

                </CardContent>
              </Card>
            </Grid>



          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
}