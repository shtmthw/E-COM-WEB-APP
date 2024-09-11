import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import StoreContProv from './globalcontex/store_contex_GLB'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContProv>
      <StrictMode>
        <App />
      </StrictMode>,
    </StoreContProv>
  </BrowserRouter>

)
