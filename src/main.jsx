import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'
import { Provider } from './Components/Provider/Provider'
import { DarkModeProvider } from '../src/Components/Common/DarkMood/DarkMood'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>

      <Provider>
        <DarkModeProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </DarkModeProvider>
      </Provider>

    </HelmetProvider>
  </StrictMode>,
)
