import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../public/super'; // Ensure this path is correct
import '../App.css'  // Make sure to include your CSS file

function Employee() {
  const [formData, setFormData] = useState({
    empName: '',
    empPosition: '',
    empPayRate: '',
    empPayType: 'hourly',
    empSupervisor: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newEmployee = {
      name: formData.empName,
      position: formData.empPosition,
      pay_rate: formData.empPayRate ? parseFloat(formData.empPayRate) : null,
      pay_type: formData.empPayType,
    };

    try {
      const { data, error } = await supabase
        .from('employee')
        .insert([newEmployee]);

      setIsLoading(false);

      if (error) {
        console.error('Error inserting data:', error);
        alert(`Error inserting data: ${error.message}`);
      } else {
        console.log('Data inserted:', data);
        alert("Employee data entered into DB");
        setFormData({

          empName: '',
          empPosition: '',
          empPayRate: '',
          empPayType: 'hourly',
  
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
      <h2>Employee</h2>
      <Form onSubmit={handleSubmit}>
        
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="empName"
            value={formData.empName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Position:</Form.Label>
          <Form.Control
            type="text"
            name="empPosition"
            value={formData.empPosition}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pay Rate:</Form.Label>
          <Form.Control
            type="number"
            name="empPayRate"
            step="0.01"
            value={formData.empPayRate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pay Type:</Form.Label>
          <Form.Control
            as="select"
            name="empPayType"
            value={formData.empPayType}
            onChange={handleChange}
          >
            <option value="hourly">Hourly</option>
            <option value="salary">Salary</option>
          </Form.Control>
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={isLoading}>
        <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>
          {isLoading ? '' : 'Submit Employee'}
        </Button>
      </Form>
    </Container>
  );
}

export default Employee;
