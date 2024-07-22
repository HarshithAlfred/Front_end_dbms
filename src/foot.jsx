import React, { useState } from 'react';
import { Container, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';
import { supabase } from '../public/super'; // Ensure this path is correct
import './App.css';  // Make sure to include your CSS file

// Main Component to display data from all tables
function Foot() {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [factories, setFactories] = useState([]);
  const [assemblyLines, setAssemblyLines] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [parts, setParts] = useState([]);
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        { data: empData, error: empError }, 
        { data: facData, error: facError },
        { data: assemData, error: assemError },
        { data: vendorData, error: vendorError },
        { data: partData, error: partError },
        { data: modelData, error: modelError }
      ] = await Promise.all([
        supabase.from('employee').select('*'),
        supabase.from('factory').select('*'),
        supabase.from('assembly_line').select('*'),
        supabase.from('vendor').select('*'),
        supabase.from('part').select('*'),
        supabase.from('model').select('*')
      ]);

      if (empError || facError || assemError || vendorError || partError || modelError) {
        throw new Error('Error fetching data from one or more tables');
      }

      setEmployees(empData);
      setFactories(facData);
      setAssemblyLines(assemData);
      setVendors(vendorData);
      setParts(partData);
      setModels(modelData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data from the database');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>

        <h2 className='basse'>Details</h2>
      <Button variant="primary" onClick={fetchData} className="my-3">
      <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>{isLoading?'':'Fetch Data'}</Button>

      {isLoading ? (
        <Spinner animation="border" role="status">
          
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>          
          <ListGroup>
          <h2 className='underline-purple'>Employee Data</h2>
            {employees.map((employee) => (
              <ListGroup.Item key={employee.id}>
                <strong>ID:</strong> {employee.id} <br />
                <strong>Name:</strong> {employee.name} <br />
                <strong>Position:</strong> {employee.position} <br />
                <strong>Pay Rate:</strong> {employee.pay_rate} <br />
                <strong>Pay Type:</strong> {employee.pay_type} <br />
                <strong>Supervisor ID:</strong> {employee.supervisor_id}
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>

          
          <ListGroup>
          <h2 className='underline-purple'>Factory Data</h2>
            {factories.map((factory) => (
              <ListGroup.Item key={factory.id}>
                <strong>ID:</strong> {factory.id} <br />
                <strong>Name:</strong> {factory.name} <br />
                <strong>City:</strong> {factory.city} <br />
                <strong>Throughput:</strong> {factory.throughput}
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>

          
          <ListGroup>
          <h2 className='underline-purple'>Assembly Line Data</h2>
            {assemblyLines.map((line) => (
              <ListGroup.Item key={line.number}>
                <strong>Number:</strong> {line.number} <br />
                <strong>Throughput:</strong> {line.throughput} <br />
                <strong>Factory ID:</strong> {line.factory_id}
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>

         
          <ListGroup>
          <h2  className='underline-purple'>Vendor Data</h2>
            {vendors.map((vendor) => (
              <ListGroup.Item key={vendor.id}>
                <strong>ID:</strong> {vendor.id} <br />
                <strong>Name:</strong> {vendor.name} <br />
                <strong>Email:</strong> {vendor.email} <br />
                <strong>Phone:</strong> {vendor.phone}
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>

         
          <ListGroup>
          <h2  className='underline-purple'>Part Data</h2>
            {parts.map((part) => (
              <ListGroup.Item key={part.id}>
                <strong>Number:</strong> {part.part_number} <br />
                <strong>Description:</strong> {part.description}
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h2 className='underline-purple'>Model Data</h2>
          <ListGroup>
            {models.map((model) => (
              <ListGroup.Item key={model.id}>
                <strong>ID:</strong> {model.id} <br />
                <strong>Name:</strong> {model.name} <br />
                <strong>Number:</strong> {model.number} <br />
                <strong>Type:</strong> {model.type} <br />
                <strong>Application:</strong> {model.application}
                <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
}

export default Foot;
