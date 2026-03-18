import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from '../configs/pages.config.ts'
import Login from '../pages/Login'
import MainLayout from '../components/layouts/MainLayout/MainLayout.tsx'
import Dashboard from '../pages/Dashboard'
import Anime from '../pages/Anime'
import Episodes from '../pages/Episodes'
import Genres from '../pages/Genres'
import Users from '../pages/Users'
import Ratings from '../pages/Ratings'
import Likes from '../pages/Likes'
import Comments from '../pages/Comments'
import Lists from '../pages/Lists'
import { DashboardLoader, MainLoader } from '../lib/page-loaders.ts'
import NotFound from '../pages/NotFound'
import Subscriptions from '../pages/Subscriptions'
import Transactions from '../pages/Transactions'

const router = createBrowserRouter([
  {
    path: PAGES.LOGIN,
    element: <Login />,
    loader: MainLoader,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: PAGES.DASHBOARD,
        element: <Dashboard />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.ANIME,
        element: <Anime />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.EPISODES,
        element: <Episodes />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.GENRES,
        element: <Genres />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.RATINGS,
        element: <Ratings />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.LIKES,
        element: <Likes />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.COMMENTS,
        element: <Comments />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.LISTS,
        element: <Lists />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.SUBSCRIPTIONS,
        element: <Subscriptions />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.TRANSACTIONS,
        element: <Transactions />,
        loader: DashboardLoader,
      },
      {
        path: PAGES.USERS,
        element: <Users />,
        loader: DashboardLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const MainRouterProvider = () => {
  return <RouterProvider router={router} />
}

export default MainRouterProvider
