import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AppContextProvider from './context/AppContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
)
