import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../public/super'; // Ensure this path is correct
import '../App.css';

function Vendor() {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorPhone: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newVendor = {
      name: formData.vendorName,
      email: formData.vendorEmail,
      phone: formData.vendorPhone
    };

    try {
      const { data, error } = await supabase
        .from('vendor')
        .insert([newVendor]);

      setIsLoading(false);

      if (error) {
        console.error('Error inserting data:', error);
        alert(`Error inserting data: ${error.message}`);
      } else {
        console.log('Data inserted:', data);
        alert("Vendor data entered into DB");
        setFormData({
          vendorName: '',
          vendorEmail: '',
          vendorPhone: ''
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
      <h2>Vendor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="vendorEmail"
            value={formData.vendorEmail}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="tel"
            name="vendorPhone"
            value={formData.vendorPhone}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
        <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>
          {isLoading ? '' : 'Submit Vendor'}
        </Button>
      </Form>
    </Container>
  );
}

export default Vendor;
