import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import '../styles/global.css'
import { MAINTENANCE } from '../config/maintenance'

// As in src/main.jsx, only the page in use is imported.
const Page = lazy(() => (MAINTENANCE ? import('../maintenance/Maintenance.jsx') : import('./LegalPage.jsx')))

// entry for terms/, privacy/ and code-of-conduct/; each HTML file names its document on <body data-doc>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense>
      <Page doc={document.body.dataset.doc} />
    </Suspense>
  </StrictMode>,
)
