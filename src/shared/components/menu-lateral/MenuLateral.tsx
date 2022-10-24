import { Avatar, Divider, Drawer, Icon, List,  ListItemButton,  ListItemIcon,  ListItemText,  useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { ListItemLink } from './ListItemLink';

interface Props {
  children: React.ReactNode;
}

export function MenuLateral({children} : Props){
  const theme = useTheme();
  const snDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { toggleTheme } = useAppThemeContext();

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
          <Box>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Icon>dark_mode</Icon>
              </ListItemIcon>
              <ListItemText primary="Alternar tema" />
            </ListItemButton>
          </Box>

        </Box>
      </Drawer>

      <Box height="100%" marginLeft={snDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}
