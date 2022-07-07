import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerAsync } from '../../redux/slices/user';
import { Link, Stack, TextField, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AppDispatch } from '../../redux/store';
import { Link as RouterLink } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Confirm password must match password'),
});

type UserRegister = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserRegister) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setLoading(true);
    try {
      const resultActionLogin = await dispatch(
        registerAsync({ email: data.email, password: data.password })
      );
      const resultLogin = unwrapResult(resultActionLogin);
      console.log(resultLogin);

      if (resultLogin.message) {
        setSuccessMessage(resultLogin.message);
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
          Sign up
        </Typography>
      </Stack>
      {errorMessage && (
        <Stack sx={{ mb: 3 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      )}
      {successMessage && (
        <Stack sx={{ mb: 3 }}>
          <Alert severity="success">{successMessage}</Alert>
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
          type={'password'}
          label="Password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />
        <TextField
          fullWidth
          autoComplete="Repeat password"
          type={'password'}
          label="Repeat Password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={false}
        sx={{ marginTop: 2 }}
      >
        Register
      </LoadingButton>
      <Stack sx={{ my: 2 }}>
        <Typography align="center">
          Already have an account?&nbsp;
          <Link
            underline="hover"
            component={RouterLink}
            variant="subtitle1"
            to="/auth/login"
            sx={{ padding: '0 5px', cursor: 'pointer' }}
          >
            Login
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
