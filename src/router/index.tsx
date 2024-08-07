import type { Route } from '@ant-design/pro-layout/es/typing';
import Root from 'containers';
import AboutPage from 'containers/About';
import Artworks from 'containers/Artworks';
import ArtworkDetail from 'containers/Artworks/ArtworkDetail';
import Home from 'containers/Home';
import PageLayout from 'containers/Layout';
import Research from 'containers/Research';
import ResearchDetail from 'containers/Research/Detail';
import Writings from 'containers/Writings';
import PublicationDetail from 'containers/Writings/PublicationDetail';
import VerseDetail from 'containers/Writings/VerseDetail';
import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import adminRoutes from './adminRoutes';
import Auth0ProviderLoader from './Auth0ProviderLoader';
import { AuthenticationGuard } from './AuthenticationGuard';
import type { RouteItem } from './types';

export const indexRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Auth0ProviderLoader>
        <Root />
      </Auth0ProviderLoader>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'statement',
        element: <AboutPage />,
      },
      {
        path: 'news',
        element: <AboutPage />,
      },
      {
        path: 'artworks/:type',
        element: <Artworks />,
        // children: [
        //   { path: 'performance', element: <Performance /> },
        //   { path: 'sculpture', element: <Performance type="sculpture" /> },
        //   { path: 'installation', element: <Performance type="installation" /> },
        //   { path: 'collaboration', element: <Performance type="collaboration" /> },
        //   { path: 'video', element: <Performance type="video" /> },
        //   { path: 'others', element: <Performance type="others" /> },
        // ],
      },
      {
        path: 'artworks/:type/:id',
        element: <ArtworkDetail />,
      },
      {
        path: 'writings/:type',
        element: <Writings />,
        children: [
          // { path: 'verses', element: <Verses /> },
          // { path: 'essays', element: <div /> },
          // {
          //   path: 'publications',
          //   element: <Publications />,
          // },
        ],
      },
      {
        path: 'writings/publications/:publicationId',
        element: <PublicationDetail />,
      },
      {
        path: 'writings/verses/:verseId',
        element: <VerseDetail />,
      },
      {
        path: 'research',
        element: <Research />,
        children: [{ path: ':id', element: <ResearchDetail /> }],
      },

      {
        path: 'admin',
        // errorElement: <NotFoundPage />,
        element: <AuthenticationGuard component={PageLayout} />,
        children: adminRoutes,
      },
      { path: '*', element: <Navigate replace to="/" /> },
    ],
  },
];

export const convertToMenuRoutes = (routeArr: RouteItem[]): Route[] => {
  return routeArr.map((route) => ({
    ...route,
    path: `/admin/${route.path}`,
    ...(Array.isArray(route.children) ? { routes: convertToMenuRoutes(route.children) } : {}),
  }));
};

export const sideMenuRoutes = convertToMenuRoutes(adminRoutes);

export const router = createBrowserRouter(indexRoutes);
