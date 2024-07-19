import { useState } from 'react'
import {Form,Button,Container }from 'react-bootstrap'
import './App.css'
import axios from 'axios'

function App(){
  
  const API_Url=import.meta.env.VITE_APIURL;
  const [formdata,setformdata]=useState({
    id:"",
    names:"",
    position:"",
    paytype:"",
    payrate:"",
    facid:"",
    faccity:"",
    vendpart:""
  });
  const handlechange=(e)=>{
    const {name,value}=e.target;
    setformdata({
      ...formdata,
      [name]:value
    });
  }
 const handle=async(e)=>{
  
  try{
    e.preventDefault();
    const response= await axios.post(`${API_Url}/home`,formdata);
    console.log(response.data)
    if(response.data===true){
       alert("Data Entered into DB");
    }
    
    if(response.data===false){
      alert("EmployeeId already exists");
    }
    setformdata({
      id: "",
      names: "",
      position: "",
      payrate: "",
      paytype: "",
      facid:"",
    faccity:"",
    vendpart:""
  });
  }  
   catch(e){
    console.log(e);
   }
 }
  return (
    <>
     <h2 className='base'>* INSERTION SECTION</h2>
      <Container>
      
      <Form onSubmit={handle}>
        <Form.Group>
          <Form.Label>
            EmployeeID:
          </Form.Label>
          <Form.Control type="number" required name="id" value={formdata.id} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            EmployeeName:
          </Form.Label>
          <Form.Control type="name" required name="names" value={formdata.names} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Position:
          </Form.Label>
          <Form.Control type="string" required name="position" value={formdata.position} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Paytype:
          </Form.Label>
          <Form.Control type="string"  name="paytype" value={formdata.paytype} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Payrate:
          </Form.Label>
          <Form.Control type="number" required name="payrate" value={formdata.payrate} onChange={handlechange}></Form.Control>
        </Form.Group>

     <h3>* At Which Factory Branch this Employee <span className='unique'>{formdata.names}</span> Works </h3>
        <Form.Group>
          <Form.Label>
            Factory Branch ID:
          </Form.Label>
          <Form.Control type="number" required name="facid" value={formdata.facid} onChange={handlechange}></Form.Control>
        </Form.Group>
           
        <Form.Group>
          <Form.Label>
            Factory Branch City:
          </Form.Label>
          <Form.Control type="string"  name="faccity" value={formdata.faccity} onChange={handlechange}></Form.Control>
        </Form.Group>
        <h3>* Production team this Employee <span className='unique'>{formdata.names}</span> Belongs </h3>
        <Form.Group>
          <Form.Label>
            Vender Part:
          </Form.Label>
          <Form.Control as="select"  name="vendpart" value={formdata.vendpart} onChange={handlechange}>
          <option value="">Select a vendor part</option>
          <option value="car_engine">Car Engine</option>
          <option value="car_body">Car Body</option>
          <option value="car_tires">Car Tires</option>
          <option value="car_interior">Car Interior</option>
          </Form.Control>
        </Form.Group>
        
        <Button varient='primary' type="submit">Insert</Button>
      </Form>
      </Container>
        
    </>
  )
};

export default App
