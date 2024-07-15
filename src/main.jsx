import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Head from './top.jsx'
import Foot from './foot.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Head/>
    <App/>
    <Foot/>
  </React.StrictMode>,
)
