import { Avatar, Divider, Drawer, List,  useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../../contexts';
import { ListItemLink } from './ListItemLink';

interface Props {
  children: React.ReactNode;
}

export function MenuLateral({children} : Props){
  const theme = useTheme();
  const snDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();

  return(
    <>
      <Drawer 
        open = { isDrawerOpen } 
        variant={snDown ? 'temporary' : 'permanent' }
        onClose={toggleDrawerOpen} 
      >
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box 
            width="100%" 
            height ={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          
          >
            <Avatar 
              sx={{ height : theme.spacing(12), width: theme.spacing(12)}}
              src="https://github.com/leonardorodriguess.png"
            />
          </Box>

          <Divider/>

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map( drawerOption => (
                <ListItemLink 
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={snDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={snDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}
