import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app2.css'
import App from './App1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
