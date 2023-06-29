const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let employees = JSON.parse(fs.readFileSync('employees.json'));

app.post('/api/employees', (req, res) => {
  const newEmployee = {
    id: uuidv4(),
    name: req.body.name,
    phone: req.body.phone,
    orderIndex: 0,
  };
 
  employees.push(newEmployee);
  fs.writeFileSync('employees.json', JSON.stringify(employees));
  res.status(201).json(newEmployee);
});


app.get('/api/employees', (req, res) => {
  res.json(employees);
});


app.put('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;
  const employeeIndex = employees.findIndex((employee) => employee.id === employeeId);

  if (employeeIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  employees[employeeIndex] = {
    ...employees[employeeIndex],
    ...updatedEmployee,
  };

  fs.writeFileSync('employees.json', JSON.stringify(employees));
  res.json(employees[employeeIndex]);
});


app.post('/api/employees/updateOrder', (req, res) => {
  const updatedEmployees = req.body;

  updatedEmployees.forEach((updatedEmployee, index) => {
    const employee = employees.find((emp) => emp.id === updatedEmployee.id);
    if (employee) {
      employee.orderIndex = index + 1;
    }
  });
  const sortedEmployees = employees.sort((a, b) => a.orderIndex - b.orderIndex);

  fs.writeFileSync('employees.json', JSON.stringify(sortedEmployees));

  res.json(sortedEmployees);
});


app.delete('/api/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const employeeIndex = employees.findIndex((employee) => employee.id === employeeId);

  if (employeeIndex === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const deletedEmployee = employees.splice(employeeIndex, 1)[0];

  fs.writeFileSync('employees.json', JSON.stringify(employees));
  res.json(deletedEmployee);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});