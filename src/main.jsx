import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import App from './App.jsx'
import Maintenance from './maintenance/Maintenance.jsx'
import { MAINTENANCE } from './config/maintenance'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {MAINTENANCE ? <Maintenance /> : <App />}
  </StrictMode>,
)
