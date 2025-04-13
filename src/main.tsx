import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import AdminDashboard from './components/layouts/AdminLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
      <AdminDashboard />
    </Provider>
  </StrictMode>
)
