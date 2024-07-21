import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../public/super'; // Ensure this path is correct
import '../App.css';

function Part() {
  const [formData, setFormData] = useState({
    partNumber: '',
    partDescription: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newPart = {
      part_number: formData.partNumber,
      description: formData.partDescription
    };

    try {
      const { data, error } = await supabase
        .from('part')
        .insert([newPart]);

      setIsLoading(false);

      if (error) {
        console.error('Error inserting data:', error);
        alert(`Error inserting data: ${error.message}`);
      } else {
        console.log('Data inserted:', data);
        alert("Part data entered into DB");
        setFormData({
          partNumber: '',
          partDescription: ''
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
      <h2>Part</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Part Number:</Form.Label>
          <Form.Control
            type="text"
            name="partNumber"
            value={formData.partNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="partDescription"
            value={formData.partDescription}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
        <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>
          {isLoading ? '' : 'Submit Part'}
        </Button>
      </Form>
    </Container>
  );
}

export default Part;
