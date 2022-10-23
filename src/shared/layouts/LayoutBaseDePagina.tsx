import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface Props{
  children: React.ReactNode,
  titulo: string,

}

export function LayoutBaseDePagina ( {children, titulo} : Props) {
  const smDown = useMediaQuery((theme : Theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();
  // const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1} >

      <Box 
        padding= {1} 
        display="flex" 
        alignItems="center" 
        height={theme. spacing(12)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={ toggleDrawerOpen }>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography variant="h5">
          {titulo}
        </Typography>
      </Box>

      <Box>
        Barra de ferramentas
      </Box>

      <Box>
        {children}
      </Box>
      
    </Box>
  );
}