import { Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from '../components/authentication/LoginForm';
const ContainerApp = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: 'cover',
}));
export default function Login() {
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
        <Paper
          sx={{
            padding: '30px 15px',
          }}
        >
          <LoginForm />
        </Paper>
      </Container>
    </ContainerApp>
  );
}
