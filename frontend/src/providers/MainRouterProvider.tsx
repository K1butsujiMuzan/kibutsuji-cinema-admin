import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from '../configs/pages.config.ts'
import LoginPage from '../pages/LoginPage'
import MainLayout from '../components/layouts/MainLayout/MainLayout.tsx'
import DashboardPage from '../pages/DashboardPage'
import AnimePage from '../pages/AnimePage'
import EpisodesPage from '../pages/EpisodesPage'
import GenresPage from '../pages/GenresPage'
import UsersPage from '../pages/UsersPage'
import RatingPage from '../pages/RatingPage'
import LikesPage from '../pages/LikesPage'
import CommentsPage from '../pages/CommentsPage'
import ListsPage from '../pages/ListsPage'
import { DashboardLoader, MainLoader } from '../lib/page-loaders.ts'

const router = createBrowserRouter([
  {
    path: PAGES.MAIN,
    element: <LoginPage />,
    loader: MainLoader,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: PAGES.DASHBOARD,
        element: <DashboardPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.ANIME,
        element: <AnimePage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.EPISODES,
        element: <EpisodesPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.GENRES,
        element: <GenresPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.RATINGS,
        element: <RatingPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.LIKES,
        element: <LikesPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.COMMENTS,
        element: <CommentsPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.LISTS,
        element: <ListsPage />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.USERS,
        element: <UsersPage />,
        loader: DashboardLoader,
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
