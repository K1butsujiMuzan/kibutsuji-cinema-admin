import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import ThemeProvider from './providers/ThemeProvider.tsx'
import MainRouterProvider from './providers/MainRouterProvider.tsx'
import QueryProvider from './providers/QueryProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <MainRouterProvider />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
