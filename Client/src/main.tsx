import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import './index.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <div>
    <RouterProvider router={router} />
    <Toaster />
  </div>
)
