import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';

const ContainerApp = styled('div')(({ theme }) => ({
  // maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // padding: theme.spacing(12, 0),
}));

export default function MainLayout() {
  return (
    <ContainerApp>
      <NavBar />
      <Outlet />
    </ContainerApp>
  );
}
