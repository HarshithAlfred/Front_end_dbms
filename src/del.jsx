import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { supabase } from '../public/super';
import './App.css'
function Del() {
  const [employees, setEmployees] = useState([]);
  const [isdLoading, setIsdLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  const fetchEmployees = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('employee').select('*');
    setIsLoading(false);
    if (error) console.error('Error fetching employees:', error);
    else setEmployees(data);
  };

  const deleteEmployee = async () => {
    if (!selectedEmployeeId) {
      alert('Please select an employee to delete.');
      return;
    }
     setIsdLoading(true);
    const { data, error } = await supabase
      .from('employee')
      .delete()
      .eq('id', selectedEmployeeId);
      setIsdLoading(false);
    if (error) console.error('Error deleting employee:', error);
    else {
      alert('Employee deleted successfully.');
      fetchEmployees(); // Refresh the list after deletion
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Container>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
          </li>
        ))}
      </ul>
      <div>
        <label htmlFor="employeeSelect">Select Employee to Delete:</label>
        <select
          id="employeeSelect"
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
        >
          <option value="">--Select an Employee--</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        <Button variant="primary" onClick={deleteEmployee} className="my-3">
      <span className='loader'style={{ display: isdLoading ? 'inline-flex' : 'none' }}></span>{isdLoading?'':'DELETE'}</Button>

      </div>
      <Button variant="primary" onClick={fetchEmployees} className="my-3">
      <span className='loader'style={{ display: isLoading ? 'inline-flex' : 'none' }}></span>{isLoading?'':'REFRESH LIST'}</Button>

    </Container>
  );
}

export default Del;
