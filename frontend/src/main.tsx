import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from './configs/pages.config.ts'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import Header from './components/layouts/Header/Header.tsx'
import ThemeProvider from './providers/ThemeProvider.tsx'
import { MainLoader } from './pages/LoginPage/LoginPage.tsx'
import { DashboardLoader } from './pages/DashboardPage/DashboardPage.tsx'

const router = createBrowserRouter([
  {
    path: PAGES.MAIN,
    element: <LoginPage />,
    loader: MainLoader,
  },
  {
    element: <Header />,
    loader: DashboardLoader,
    children: [
      {
        path: PAGES.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
