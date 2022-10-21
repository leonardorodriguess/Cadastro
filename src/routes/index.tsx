import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext } from '../shared/contexts';

export function AppRoutes (): JSX.Element{
  const { toggleTheme } = useAppThemeContext();
  return (
    <Routes>
      <Route path="/pagina-inicial" element={
        <Button
          variant='contained'
          color='primary'
          onClick={toggleTheme}
        >
            Tema
        </Button>}
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />}/>
    </Routes>
  );
}