import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import ThemeProvider from './providers/ThemeProvider.tsx'
import MainRouterProvider from './providers/MainRouterProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MainRouterProvider />
    </ThemeProvider>
  </StrictMode>,
)
