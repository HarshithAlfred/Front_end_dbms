import React from 'react'
import ReactDOM from 'react-dom/client'
import  Path from './path.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Path/>
  </BrowserRouter>
)
