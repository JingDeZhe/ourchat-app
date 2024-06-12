import 'virtual:uno.css'
import 'overlayscrollbars/overlayscrollbars.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-contexify/dist/ReactContexify.css'
import './styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/main'
import { Slide, ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <RouterProvider router={router}></RouterProvider>
    </React.Suspense>
    <ToastContainer
      position="top-center"
      autoClose={500}
      icon={false}
      closeButton={false}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="light"
      transition={Slide}
    ></ToastContainer>
  </React.StrictMode>
)
