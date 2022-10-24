import { Icon, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps{
  to: string,
  icon: string,
  label: string,
  onClick?: () => void | undefined 
}

export function ListItemLink ({to, icon, label, onClick} : IListItemLinkProps){
  const navigate = useNavigate();

  //encontrando a rota
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({path: resolvedPath.pathname, end : false});

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}