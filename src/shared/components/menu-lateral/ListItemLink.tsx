import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { PathMatch, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface IListItemLinkProps{
  path: string,
  icon: string,
  label: string,
  filhos?: IListItemLinkProps[];
  onClick?: () => void | undefined 
}

export function ListItemLink ({path, icon, label, filhos, onClick} : IListItemLinkProps){
  const navigate = useNavigate();


  //encontrando a rota
  const resolvedPath = useResolvedPath(path);
  const match = useMatch({path: resolvedPath.pathname, end : false});

  /* const handleClick = (path : string) => {
    navigate(path);
    onClick?.();
  }; */

  function handleClick () {
    navigate(path);
    onClick?.();
  }

  const listar = (
    icon: string, 
    path : string,
    label: string, 
    match : PathMatch<string> | null
  ) => {

    return (
      <ListItemButton 
        selected={!!match} 
        color={'#46456'}
        // onClick={handleClick(path)}
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
      <Box padding={0}>
        <Accordion 
          expanded = {filhos != null? undefined : false}
          disableGutters = {true}
          // disableSpacing={true}
          // sx={{ p: 0, margin: 0,  mt: 0, pt:0, py:0, my:0}} 
          // square={true}
        >
          <AccordionSummary

            expandIcon={filhos != null ? <ExpandMoreIcon />  : undefined}
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
                {listar(filho.icon, filho.path, filho.label, match)}
              </AccordionDetails>
            ))
          )}
        </Accordion>
      </Box>
    );
  };

  return (
    acordeon(listar(icon, path, label, match), filhos)

  );
}