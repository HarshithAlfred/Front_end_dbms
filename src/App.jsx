import { useState } from 'react'
import {Form,Button,Container }from 'react-bootstrap'
import './App.css'
//import axios from 'axios'

function App(){
  const[formdata,setformdata]=useState({
    id:"",
    names:"",
    position:"",
    payrate:"",
    paytype:""
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
    console.log(formdata);
    e.preventDefault();
  //  const response= await axios.post(`${API_url}/`,formdata);
  //   console.log(response);
    if(response.data=true){
       alert("Data Entered into DB")
    }
    else if(response.data=false){
      alert("Data Entered exists or an error")
    }
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
          <Form.Control type="number" required name="id" value={FormData.id} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            EmployeeName:
          </Form.Label>
          <Form.Control type="name" required name="name" value={FormData.names} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Position:
          </Form.Label>
          <Form.Control type="type" name="position" value={FormData.position} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Payrate:
          </Form.Label>
          <Form.Control type="integer" name="payrate" value={FormData.payrate} onChange={handlechange}></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Paytype:
          </Form.Label>
          <Form.Control type="type"  name="paytype" value={FormData.paytype} onChange={handlechange}></Form.Control>
        </Form.Group>
        <Button varient='primary' type="submit">Insert</Button>
      </Form>
      </Container>
        
    </>
  )
};

export default App
