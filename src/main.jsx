import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import { MAINTENANCE } from './config/maintenance'

// Only the page in use is imported, so a maintenance build ships none of the real site
// and it can't be revealed from the browser.
const Page = lazy(() => (MAINTENANCE ? import('./maintenance/Maintenance.jsx') : import('./App.jsx')))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense>
      <Page />
    </Suspense>
  </StrictMode>,
)
