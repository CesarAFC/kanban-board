import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SecondApp from './SecondApp.tsx'
import ThirdApp from './ThirdApp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <SecondApp /> */}
    {/* <ThirdApp /> */}
  </React.StrictMode>,
)
