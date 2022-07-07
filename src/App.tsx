import { unwrapResult } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

import { getMe, initialize, UserState, UserToken } from './redux/slices/user';
import { AppDispatch, RootState } from './redux/store';
import Router from './routes';
import { handleTokenExpired, isValidToken, setSession } from './utils/jwt';
import Loading from './components/Loading';

export default function App() {
  const { isInitialized } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const tokenData = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  const theme = createTheme({
    palette: {
      primary: {
        main: lightBlue[500],
      },
    },
  });

  const auth = useMemo<UserState>(() => {
    return { isAuthenticated: false, isInitialized: true, user: null };
  }, []);

  if (tokenData && isValidToken(tokenData)) {
    const decode = jwtDecode<UserToken>(tokenData);
    auth.isAuthenticated = true;
    auth.user = {
      email: decode.nameid,
      validateTime: decode.exp,
      token: tokenData,
      refreshToken: refreshToken,
    };
  }

  useEffect(() => {
    console.log('Init state');
    const result = dispatch(initialize(auth));
    const currentAuth = unwrapResult(result);

    if (
      currentAuth.user &&
      currentAuth.user.refreshToken &&
      currentAuth.user.refreshToken
    ) {
      handleTokenExpired(currentAuth.user.validateTime!);
      setSession(currentAuth.user.token!);
      dispatch(getMe());
    }
  }, [auth, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {isInitialized ? <Router /> : <Loading fullHeight />}
    </ThemeProvider>
  );
}
