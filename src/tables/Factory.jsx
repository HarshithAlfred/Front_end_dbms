import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../public/super'; // Ensure this path is correct
import '../App.css';  // Make sure to include your CSS file

function Factory() {
  const [formData, setFormData] = useState({
    factoryName: '',
    factoryCity: '',
    factoryThroughput: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newFactory = {
      name: formData.factoryName,
      city: formData.factoryCity,
      throughput: formData.factoryThroughput ? parseInt(formData.factoryThroughput) : null
    };

    try {
      const { data, error } = await supabase
        .from('factory')
        .insert([newFactory]);

      setIsLoading(false);

      if (error) {
        console.error('Error inserting data:', error);
        alert(`Error inserting data: ${error.message}`);
      } else {
        console.log('Data inserted:', data);
        alert("Factory data entered into DB");
        setFormData({
          factoryName: '',
          factoryCity: '',
          factoryThroughput: ''
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
      <h2>Factory</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="factoryName"
            value={formData.factoryName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            name="factoryCity"
            value={formData.factoryCity}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Throughput:</Form.Label>
          <Form.Control
            type="number"
            name="factoryThroughput"
            value={formData.factoryThroughput}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
        <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>
          {isLoading ? '' : 'Submit Factory'}
        </Button>
      </Form>
    </Container>
  );
}

export default Factory;
