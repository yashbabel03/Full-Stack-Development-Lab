const express = require('express');
const app = express();
app.use(express.json());

let calculations = [
  { id: 1, operation: 'addition', a: 10, b: 5, result: 15 },
  { id: 2, operation: 'multiplication', a: 4, b: 6, result: 24 }
];

// GET all calculations
app.get('/api/calculator', (req, res) => {
  res.json(calculations);
});

// GET single calculation
app.get('/api/calculator/:id', (req, res) => {
  const calc = calculations.find(c => c.id === parseInt(req.params.id));
  if (!calc) return res.status(404).json({ error: 'No such calculation' });
  res.json(calc);
});

// POST new calculation
app.post('/api/calculator', (req, res) => {
  const { operation, a, b } = req.body;
  let result;
  if (operation === 'addition') result = a + b;
  else if (operation === 'subtraction') result = a - b;
  else if (operation === 'multiplication') result = a * b;
  else if (operation === 'division') result = a / b;
  const calc = { id: calculations.length + 1, operation, a, b, result };
  calculations.push(calc);
  res.status(201).json(calc);
});

// PATCH update calculation
app.patch('/api/calculator/:id', (req, res) => {
  const calc = calculations.find(c => c.id === parseInt(req.params.id));
  if (!calc) return res.status(404).json({ error: 'No such calculation' });
  Object.assign(calc, req.body);
  res.json(calc);
});

// DELETE calculation
app.delete('/api/calculator/:id', (req, res) => {
  const index = calculations.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'No such calculation' });
  calculations.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
});

app.listen(4000, () => console.log('Server running on port 4000'));
