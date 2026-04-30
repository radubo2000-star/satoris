import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/globals.css'
import App from './App.tsx'

// Global error handler
window.onerror = (message, source, lineno, colno, error) => {
  import('./api/analytics').then(({ trackError }) => {
    trackError(`${message} at ${source}:${lineno}:${colno}`, error?.stack)
  })
  return false
}

window.onunhandledrejection = (event) => {
  import('./api/analytics').then(({ trackError }) => {
    trackError('Unhandled promise rejection', event.reason?.stack)
  })
}
