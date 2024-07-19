import React, { useEffect } from "react";
import { useState } from "react";
import './App.css'
import { Form ,Button, Container } from "react-bootstrap";
import axios from 'axios'
function foot(){
    const API_Url=import.meta.env.VITE_APIURL;
    const [isLoading, setIsLoading] = useState(false);
    const [isdLoading, setIsdLoading] = useState(false);
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
            setIsdLoading(true);
            const resp=await axios.delete(`${API_Url}/delete/${del.del}`);
            setIsdLoading(false);
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
            setIsLoading(true);
           const response =await axios.post(`${API_Url}/search`,qori);
            setIsLoading(false);
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
    <Button variant="primary " disabled={isLoading} type="submit"><span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>{isLoading?'':"Fetch"}</Button>
    </Form>
    </Container>
    <div>
            <h1 className="basse">Employee List</h1>
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
        <Button variant="primary " disabled={isdLoading} type="submit"><span className='loader'style={{ display: isdLoading ? 'inline-flex' : 'none' }}></span>{isdLoading?'':"Delete"}</Button>
    </Form>
    </Container>
    </>
)
};
export default foot