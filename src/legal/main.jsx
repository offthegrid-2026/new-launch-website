import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import '../styles/global.css'
import LegalPage from './LegalPage.jsx'

// entry for terms/, privacy/ and code-of-conduct/; each HTML file names its document on <body data-doc>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LegalPage doc={document.body.dataset.doc} />
  </StrictMode>,
)
