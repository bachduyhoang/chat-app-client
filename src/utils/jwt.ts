import jwtDecode from 'jwt-decode';
//
import { request } from './axios';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string | null) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  // const timeLeft = exp * 1000 - currentTime;
  const timeLeft = 6000;
  console.log(timeLeft, ' timeleft');
  expiredTimer = window.setTimeout(() => {
    console.log('expired');
    // localStorage.removeItem('token');
    // You can do what ever you want here, like show a notification
  }, timeLeft);
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    request.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode<{ exp: number }>(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('token');
    delete request.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, handleTokenExpired };
