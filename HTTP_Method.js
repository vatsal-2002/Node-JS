const express = require('express');
const app = express();

// GET Request
app.get('/', (req, res) => {
  res.send('Hello, this is a GET request!');
});


// POST Request
app.use(express.json()); // Parse JSON requests

app.post('/submit', (req, res) => {
    const data = req.body;
    res.json({ message: 'Data submitted successfully', data });
});

// PUT method
app.put('/update/:id', (req, res) => {
  const resourceId = req.params.id;
  const updatedData = req.body;
  res.json({ message: `Resource ${resourceId} updated successfully`, updatedData });
});

// PATCH method
app.patch('/modify/:id', (req, res) => {
  const resourceId = req.params.id;
  const partialData = req.body;
  res.json({ message: `Resource ${resourceId} modified successfully`, partialData });
});

// DELETE method
app.delete('/remove/:id', (req, res) => {
  const resourceId = req.params.id;
  res.json({ message: `Resource ${resourceId} removed successfully` });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});