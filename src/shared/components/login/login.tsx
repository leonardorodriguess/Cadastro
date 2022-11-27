import { Box } from '@mui/material';
import { useAuthContext } from '../../contexts';

interface ILoginProps {
  children: React.ReactNode;
}

export function Login ({children} : ILoginProps){
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box>
      login
    </Box>
  );
}