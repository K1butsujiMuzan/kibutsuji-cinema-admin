import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from './configs/pages.config.ts'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: PAGES.MAIN,
    element: <LoginPage />,
  },
  {
    path: PAGES.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
