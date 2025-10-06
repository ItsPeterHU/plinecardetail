import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './locales/i18n'; // Fordításért felelős

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
