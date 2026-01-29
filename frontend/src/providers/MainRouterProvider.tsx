import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from '../configs/pages.config.ts'
import LoginPage from '../pages/LoginPage'
import { MainLoader } from '../pages/LoginPage/LoginPage.tsx'
import MainLayout from '../components/layouts/MainLayout/MainLayout.tsx'
import { DashboardLoader } from '../pages/DashboardPage/DashboardPage.tsx'
import DashboardPage from '../pages/DashboardPage'
import AccountPage from '../pages/AccountPage'
import AgeLimitsPage from '../pages/AgeLimitsPage'
import AnimePage from '../pages/AnimePage'
import EpisodesPage from '../pages/EpisodesPage'
import GenresPage from '../pages/GenresPage'
import SessionsPage from '../pages/SessionsPage'
import StatusesPage from '../pages/StatusesPage'
import TypesPage from '../pages/TypesPage'
import UsersPage from '../pages/UsersPage'
import VerificationsPage from '../pages/VerificationsPage'

const router = createBrowserRouter([
  {
    path: PAGES.MAIN,
    element: <LoginPage />,
    loader: MainLoader,
  },
  {
    element: <MainLayout />,
    loader: DashboardLoader,
    children: [
      {
        path: PAGES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: PAGES.ACCOUNTS,
        element: <AccountPage />,
      },
      {
        path: PAGES.AGE_LIMITS,
        element: <AgeLimitsPage />,
      },
      {
        path: PAGES.ANIME,
        element: <AnimePage />,
      },
      {
        path: PAGES.EPISODES,
        element: <EpisodesPage />,
      },
      {
        path: PAGES.GENRES,
        element: <GenresPage />,
      },
      {
        path: PAGES.SESSIONS,
        element: <SessionsPage />,
      },
      {
        path: PAGES.STATUSES,
        element: <StatusesPage />,
      },
      {
        path: PAGES.TYPES,
        element: <TypesPage />,
      },
      {
        path: PAGES.USERS,
        element: <UsersPage />,
      },
      {
        path: PAGES.VERIFICATIONS,
        element: <VerificationsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

const MainRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default MainRouterProvider
