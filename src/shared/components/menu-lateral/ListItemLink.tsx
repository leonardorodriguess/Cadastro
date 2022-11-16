import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { PathMatch, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IListItemLinkProps{
  path: string,
  icon: string,
  label: string,
  filhos?: IListItemLinkProps[];
  onClick?: () => void | undefined 
}

export function ListItemLink ({path, icon, label, filhos, onClick} : IListItemLinkProps){
  const navigate = useNavigate();


  const listar = (
    icon: string, 
    path : string,
    label: string, 
  ) => {

    const resolvedPath = useResolvedPath(path);
    const match = useMatch({path: resolvedPath.pathname, end : false});

    function handleClick (path : string) {
      navigate(path);
      onClick?.();
    }

    return (
      <ListItemButton 
        selected={!!match} 
        onClick={() => handleClick(path)}
      >
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    );
  };

  const acordeon = (pai: JSX.Element , filhos?: IListItemLinkProps[]) => {
    return (
      <Box padding={0} display={'block'} >
        <Accordion 
          expanded = {filhos != null? undefined : false}
          disableGutters = {true}
          // disableSpacing={true}
          // sx={{ p: 0, margin: 0,  mt: 0, pt:0, py:0, my:0}} 
          square={true}
        >
          <AccordionSummary

            expandIcon={filhos != null ? <ExpandMoreIcon /* display={'contents'} */ sx={{rigth : '10px'}} />  : undefined}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ p: 0, margin: 0,  mt: 0, pt:0, py:0, my:0}} 
          >
            {pai}
          </AccordionSummary >
          {filhos != null && (
            filhos.map((filho) => (
              <AccordionDetails 
                key={label} 
                sx={{p : 0, margin: 0, mt: 0, pt:0, py:0, my:0}}
              >
                {listar(filho.icon, filho.path, filho.label)}
              </AccordionDetails>
            ))
          )}
        </Accordion>
      </Box>
    );
  };

  return (
    acordeon(listar(icon, path, label), filhos)

  );
}