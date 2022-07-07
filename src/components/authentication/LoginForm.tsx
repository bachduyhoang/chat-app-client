import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getMe, loginAsync } from '../../redux/slices/user';
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppDispatch } from '../../redux/store';
import { UserLogin } from '../../@type/User';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSession } from '../../utils/jwt';
import { ErrorMessage } from '../../@type/ErrorMessage';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be more than 6 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: yupResolver(schema),
  });

  const handleShowPassword = () => {
    setShowPassword((prevShow) => !prevShow);
  };
  const onSubmit = async (data: UserLogin) => {
    setLoading(true);
    try {
      const resultActionLogin = await dispatch(loginAsync(data));
      const resultLogin = unwrapResult(resultActionLogin);
      if (resultLogin.token) {
        setSession(resultLogin.token);
        const resultActionGetMe = await dispatch(getMe());
        const resultGetMe = unwrapResult(resultActionGetMe);
        if (resultGetMe) {
          navigate('/');
        }
      }
    } catch (error) {
      const errorAuth = error as ErrorMessage;
      setErrorMessage(errorAuth.message);
    }
    setLoading(false);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ marginBottom: 3 }} alignItems="center">
        <Typography variant="h4" gutterBottom>
          Sign in to Chat App
        </Typography>
      </Stack>
      {errorMessage && (
        <Stack sx={{ mb: 3 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      )}
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Typography>Don't have an account?</Typography>
        <Link
          underline="hover"
          component={RouterLink}
          variant="subtitle1"
          to="/auth/register"
          sx={{ padding: '0 5px', cursor: 'pointer' }}
        >
          Register
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
      >
        Login
      </LoadingButton>
    </form>
  );
}
