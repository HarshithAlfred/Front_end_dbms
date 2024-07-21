import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../public/super'; // Ensure this path is correct
import '../App.css';  // Make sure to include your CSS file

function AssemblyLine() {
  const [formData, setFormData] = useState({
    assemblyLineNumber: '',
    assemblyLineThroughput: '',
    assemblyLineFactory: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newAssemblyLine = {
      number: formData.assemblyLineNumber,
      throughput: formData.assemblyLineThroughput ? parseInt(formData.assemblyLineThroughput) : null,
      factory_id: formData.assemblyLineFactory
    };

    try {
      const { data, error } = await supabase
        .from('assembly_line')
        .insert([newAssemblyLine]);

      setIsLoading(false);

      if (error) {
        console.error('Error inserting data:', error);
        alert(`Error inserting data: ${error.message}`);
      } else {
        console.log('Data inserted:', data);
        alert("Assembly Line data entered into DB");
        setFormData({
          assemblyLineNumber: '',
          assemblyLineThroughput: '',
          assemblyLineFactory: ''
        });
      }
    } catch (e) {
      console.error('Network error:', e);
      alert("Network error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2>Assembly Line</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Number:</Form.Label>
          <Form.Control
            type="text"
            name="assemblyLineNumber"
            value={formData.assemblyLineNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Throughput:</Form.Label>
          <Form.Control
            type="number"
            name="assemblyLineThroughput"
            value={formData.assemblyLineThroughput}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Factory:</Form.Label>
          <Form.Control
            type="text"
            name="assemblyLineFactory"
            value={formData.assemblyLineFactory}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
        <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>
          {isLoading ? '' : 'Submit Assembly Line'}
        </Button>
      </Form>
    </Container>
  );
}

export default AssemblyLine;
