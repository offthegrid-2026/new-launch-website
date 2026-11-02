import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import '../styles/global.css'
import LegalPage from './LegalPage.jsx'
import Maintenance from '../maintenance/Maintenance.jsx'
import { MAINTENANCE } from '../config/maintenance'

// entry for terms/, privacy/ and code-of-conduct/; each HTML file names its document on <body data-doc>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {MAINTENANCE ? <Maintenance /> : <LegalPage doc={document.body.dataset.doc} />}
  </StrictMode>,
)
