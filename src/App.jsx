
import './App.css'
import Employee from './tables/Employee'
import Factory from './tables/Factory'
import AssemblyLine from './tables/AssemblyLine'
import Vendor from './tables/Vendor'
import Part from './tables/Part'
import Model from './tables/Mdl'

function App(){
  
  return (
    <>
      
      <Employee />
      <Factory />
      <Model/>
      <Part/>
      <AssemblyLine/>
      <Vendor />
  
        
    </>
  )
};

export default App
