import React from "react";
import './App.css'
import { Button } from "react-bootstrap";
import axios from 'axios'
function foot(){
    const handle=async (e)=>{
        e.preventDefault();
        try{
          // const response =await axios.get(`${API_Url}/`);
           //console.log(response);
    
               }
          
        }
        catch(e){console.log(e)}
    
    }
return(
    <>
    <h2 className='base'>* DISPLAY SECTION</h2>
    <Form onSubmit={handle} >
    <Button varient="primary "type="Submit">Fetch</Button>
    </Form>
    </>
)
};
export default foot