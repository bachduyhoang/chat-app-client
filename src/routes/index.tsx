import { useRoutes, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import AuthGuard from '../guards/AuthGuard';
import { lazy, Suspense } from 'react';
import FullLayout from '../components/FullLayout';
import GuestGuard from '../guards/GuestGuard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Loading from '../components/Loading';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<Loading fullHeight={true} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '/',
          element: <Navigate to="/home" replace />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'user',
          element: <Navigate to="/user/profile" replace />,
        },
        {
          path: 'user/profile',
          element: <Profile />,
        },
        {
          path: 'user/:id',
          element: <UserDetail />,
        },
      ],
    },
    {
      path: 'auth',
      element: (
        <GuestGuard>
          <FullLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
    {
      path: '*',
      element: <FullLayout />,
      children: [
        {
          path: '404',
          element: <NotFound />,
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },
      ],
    },
  ]);
}

const Home = Loadable(lazy(() => import('../pages/Home')));
const Login = Loadable(lazy(() => import('../pages/Login')));
const Register = Loadable(lazy(() => import('../pages/Register')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const UserDetail = Loadable(lazy(() => import('../pages/UserDetail')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
