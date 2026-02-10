import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from '../configs/pages.config.ts'
import LoginPage from '../pages/LoginPage'
import { MainLoader } from '../pages/LoginPage/LoginPage.tsx'
import MainLayout from '../components/layouts/MainLayout/MainLayout.tsx'
import { DashboardLoader } from '../pages/DashboardPage/DashboardPage.tsx'
import DashboardPage from '../pages/DashboardPage'
import AnimePage from '../pages/AnimePage'
import EpisodesPage from '../pages/EpisodesPage'
import GenresPage from '../pages/GenresPage'
import UsersPage from '../pages/UsersPage'
import RatingPage from '../pages/RatingPage'
import LikesPage from '../pages/LikesPage'
import CommentsPage from '../pages/CommentsPage'
import ListsPage from '../pages/ListsPage'

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
        path: PAGES.RATINGS,
        element: <RatingPage />,
      },
      {
        path: PAGES.LIKES,
        element: <LikesPage />,
      },
      {
        path: PAGES.COMMENTS,
        element: <CommentsPage />,
      },
      {
        path: PAGES.LISTS,
        element: <ListsPage />,
      },
      {
        path: PAGES.USERS,
        element: <UsersPage />,
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
