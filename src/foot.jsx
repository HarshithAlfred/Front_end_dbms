import React, { useEffect } from "react";
import { useState } from "react";
import './App.css'
import { Form ,Button, Container } from "react-bootstrap";
import axios from 'axios'
function foot(){
    const API_Url=import.meta.env.VITE_APIURL;
    const [emp,setemp]=useState([]);
    const [del,setdel]=useState({
        del:""
    });
    const [qori,setqori]=useState({
        qori:""
    });
    const handle=(e)=>{
        let {name,value}=e.target;
        setqori({
         ...qori,
         [name]:value});
     }
     const delfun=(e)=>{
        let {name,value}=e.target;
        setdel({
            ...del,[name]:value
        });
     }
    const deletion=async (e)=>
    {
        e.preventDefault();
        try{
            const resp=await axios.delete(`${API_Url}/delete/${del.del}`);
            console.log(resp.data);
            if(resp.data===true){alert(`ID ${del.del} Tuple Deleted `)}
            if(resp.data===false){alert("ID Not Found")}
            setdel({ del: '' });
        }
        catch(e){console.log(e);}
    }
    const retrive=async (e)=>
    {
        e.preventDefault();
        try{
           const response =await axios.post(`${API_Url}/search`,qori);
           if(response.data!==false){
           setemp(response.data)}
           if(response.data===false){
            alert('No ID Found');
            setemp([]);
           }
            
           setqori({
                qori: ""
             });
        }
        catch(e){console.log(e)}
    }
    
return(
    <>
    <h2 className='base'>* DISPLAY SECTION</h2>
    <Container>
     <Form onSubmit={retrive}>
        <Form.Control type='textarea' placeholder="Eg. 1" value={qori.qori} name="qori" onChange={handle}></Form.Control>
    <Button varient="primary "type="submit">Fetch</Button>
    </Form>
    </Container>
    <div>
            <h1>Employee List</h1>
            <ul>
                {emp.map(emp=> (
                    <li key={emp._id}>
                        <hr/>
                        <p>--------------------------------------</p>
                        <strong>|Employee ID|</strong> {emp.EmployeeId} |<br />
                        <strong>|    Name   |</strong> {emp.EmployeeName} |<br />
                        <strong>|  Position |</strong> {emp.Position} |<br />
                        <strong>|  Pay Rate |</strong> {emp.Payrate} |<br/>
                        <strong>|  Pay Type |</strong> {emp.Paytype} |<br />
                        <hr style={{ color: 'yellow', backgroundColor: 'yellow', height: '2px', border: 'none' }}/>
                        <strong>|  Factory ID |</strong> {emp.Factoryid} |<br />
                        <strong>|  Factory City |</strong> {emp.Factorycity} |<br />
                        <strong>|  Vendor part |</strong> {emp.Vendorpart} |<br />
                        <p>--------------------------------------</p>
                        
                    </li>
                    
                ))}
            </ul>
        </div>
        <h2 className='base'>* DELETE SECTION</h2>
    <Container>
     <Form onSubmit={deletion}>
        <Form.Control type='textarea' placeholder="Eg. 1" required value={del.del} name="del" onChange={delfun}></Form.Control>
    <Button varient="primary "type="submit">Delete</Button>
    </Form>
    </Container>
    </>
)
};
export default foot