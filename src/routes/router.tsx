/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import MainLayout from 'layouts/main-layout';
import AuthLayout from 'layouts/auth-layout';
import Splash from 'components/loading/Splash';
import PageLoader from 'components/loading/PageLoader';
import PrivateRoute from 'components/authentication/PrivateRoute';
import AuthRoute from 'components/authentication/AuthRoute';
//import POSPage from 'pages/sales/salesindex';
import Landing from 'pages/sales/catalog';
import LandingPage from 'pages/dashboard/welcome';
import AboutPage from 'pages/dashboard/about';


const App = lazy(() => import('App'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Login = lazy(() => import('pages/authentication/Login'));
const Signup = lazy(() => import('pages/authentication/Signup'));

const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <PrivateRoute>
              <MainLayout>
                <Suspense fallback={<PageLoader />}>
                  <Outlet />
                </Suspense>
              </MainLayout>
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
          ],
        },
        {
          path: rootPaths.authRoot,
          element: (
            <AuthRoute>
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            </AuthRoute>
          ),
          children: [
            {
              path: paths.login,
              element: <Login />,
            },
            {
              path: paths.signup,
              element: <Signup />,
            },
          ],
        },
        {
          path: rootPaths.pagesRoot,
          element: (
            //<AuthRoute>
              //<AuthLayout>
                <Outlet />
              //</AuthLayout>
            //</AuthRoute>
          ),
          children: [
            // {
            //   path: paths.sales,
            //   element: <POSPage />,
            // },
            {
              path: paths.catalog,
              element: <Landing />,
            },
            {
              path: paths.welcome,
              element: <LandingPage />,
            },
            {
              path: paths.about,
              element: <AboutPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/',
  },
);

export default router;
