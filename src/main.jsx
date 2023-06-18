import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider, { Authcontext } from './Component/AuthProvider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'




const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <div className='bg-white'>
    <div className='min-h-screen max-w-screen-xl mx-auto '>
      <AuthProvider>
        <React.StrictMode>
          <RouterProvider  router={router} />
        </React.StrictMode>
      </AuthProvider>
    </div>
  </div>
  </QueryClientProvider>
)
