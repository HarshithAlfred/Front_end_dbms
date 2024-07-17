import Foot from './foot.jsx'
import Head from './top.jsx'
import App from './App.jsx'
import { Route , Routes } from "react-router-dom"

function path() {
  return (
     <>
     <Head/> 
     <App/>
     <Foot/>
  </>
       
  )
}

export default path