import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface Props{
  children: React.ReactNode,
  titulo: string,
  barraDeFerramentas?: React.ReactNode

}

export function LayoutBaseDePagina ( {children, titulo, barraDeFerramentas} : Props) {
  const smDown = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme : Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >

      <Box 
        padding= {1} 
        display="flex" 
        alignItems="center" 
        gap={1}
        height={theme. spacing(smDown ? 6 : mdDown ? 8: 12)}
      >
        {smDown && (
          <IconButton onClick={ toggleDrawerOpen }>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography 
          overflow="hidden" //Quando o texto tiver muito grande faz com que suma
          whiteSpace="nowrap" //Não quebra novas linhas
          textOverflow="ellipses" // Aparece 3 pontinhos como continuação
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && (
        <Box>
          {barraDeFerramentas}
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
      
    </Box>
  );
}