import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <div>
   <RouterProvider router={router}></RouterProvider>
  </div>
  </StrictMode>,
)
