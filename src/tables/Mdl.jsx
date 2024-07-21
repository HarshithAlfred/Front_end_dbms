import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../public/super'; // Ensure this path is correct
import '../App.css';

function Model() {
  const [formData, setFormData] = useState({
    modelName: '',
    modelNumber: '',
    modelType: '',
    modelApplication: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newModel = {
      name: formData.modelName,
      number: formData.modelNumber,
      type: formData.modelType,
      application: formData.modelApplication
    };

    try {
      const { data, error } = await supabase
        .from('model')
        .insert([newModel]);

      setIsLoading(false);

      if (error) {
        console.error('Error inserting data:', error);
        alert(`Error inserting data: ${error.message}`);
      } else {
        console.log('Data inserted:', data);
        alert("Model data entered into DB");
        setFormData({
          modelName: '',
          modelNumber: '',
          modelType: '',
          modelApplication: ''
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
      <h2>Model</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="modelName"
            value={formData.modelName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Number:</Form.Label>
          <Form.Control
            type="text"
            name="modelNumber"
            value={formData.modelNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Type:</Form.Label>
          <Form.Control
            type="text"
            name="modelType"
            value={formData.modelType}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Application:</Form.Label>
          <Form.Control
            type="text"
            name="modelApplication"
            value={formData.modelApplication}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
        <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>
          {isLoading ? '' : 'Submit Model'}
        </Button>
      </Form>
    </Container>
  );
}

export default Model;
