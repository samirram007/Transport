import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import { ThemeContextProvider } from './contexts/ThemeContextProvider'
import './index.css'
import { queryClient } from './lib/queryClient'
import AuthContextProvider from './modules/Auth/contexts/AuthContextProvider'
import PlayGround from './PlayGround'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider  >

          <AuthContextProvider>


            <PlayGround />
            <Toaster richColors
              position="bottom-center"
              visibleToasts={9}
              toastOptions={{ className: 'my-toast  ' }} />
          </AuthContextProvider>
        </ThemeContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
