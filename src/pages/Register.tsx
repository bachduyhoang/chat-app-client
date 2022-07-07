import { Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import RegisterForm from '../components/authentication/RegisterForm';
const ContainerApp = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: 'cover',
}));
export default function Register() {
  return (
    <ContainerApp>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
        maxWidth="sm"
      >
        <Paper sx={{ padding: '30px 15px' }}>
          <RegisterForm />
        </Paper>
      </Container>
    </ContainerApp>
  );
}
