import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import ThemeProvider from './providers/ThemeProvider.tsx'
import MainRouterProvider from './providers/MainRouterProvider.tsx'
import QueryProvider from './providers/QueryProvider.tsx'
import ToastBox from './components/ui/Toast/ToastBox.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <MainRouterProvider />
        <ToastBox />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
