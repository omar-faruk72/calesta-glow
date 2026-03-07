import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <div>
    <Toaster position="top-center" reverseOrder={false} />
  <QueryClientProvider client={queryClient}>
     <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
  </div>
  </StrictMode>,
)
