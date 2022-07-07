import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const ContainerApp = styled('div')(({ theme }) => ({
  // maxWidth: 480,
  margin: 'auto',
  // display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage:
    'url("https://www.monday-8am.com/wp-content/uploads/2018/08/Don%E2%80%99t-underestimate-the-value-of-small-talk-1024x614.jpg")',
  // padding: theme.spacing(12, 0),
  backgroundSize: 'cover',
}));

export default function FullLayout() {
  return (
    <ContainerApp>
      <Outlet />
    </ContainerApp>
  );
}
