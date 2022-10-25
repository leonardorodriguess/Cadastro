import { Button, TextField, Box, Paper, useTheme, Icon, IconButton } from '@mui/material';

interface IBarraDeFeramentasProps{
  textoDaBusca?: string,
  mostrarInputBusca?: boolean,
  aoMudarTextoDeBusca?: (novoTexto: string) => void
  textoBotaoNovo?: string,
  mostrarBotaoNovo?: boolean,
  aoClicarEmNovo?: () => void
}

export function BarraDeFerramentas (
  {
    textoDaBusca = '', 
    mostrarInputBusca = false, 
    aoMudarTextoDeBusca,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarEmNovo
  }: IBarraDeFeramentasProps
){
  const theme = useTheme();
  
  return (
    <Box 
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height = {theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <>
          <TextField 
            size='small'
            placeholder='Pesquisar...'
            value={textoDaBusca}
            onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          />
          <IconButton>
            <Icon>search</Icon>
          </IconButton>
        </>
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo &&(
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
}