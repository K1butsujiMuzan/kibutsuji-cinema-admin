import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PAGES } from './configs/pages.config.ts'
import LoginPage from './pages/LoginPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'

const router = createBrowserRouter([
  {
    path: PAGES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PAGES.DASHBOARD,
    element: <DashboardPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
