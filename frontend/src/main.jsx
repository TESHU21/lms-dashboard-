import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from './context/authContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    <ThemeProvider storageKey="vite-ui-theme">
      <AuthProvider>
           <App />
      </AuthProvider>
    
    </ThemeProvider>
   
    </BrowserRouter>
   
  </StrictMode>,
)
