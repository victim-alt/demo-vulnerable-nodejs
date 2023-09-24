const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// For parsing JSON requests
app.use(bodyParser.json());

// Insecure route with SQL injection vulnerability
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  // Execute the SQL query (insecure)
  // In a real application, you should use parameterized queries or an ORM to prevent SQL injection.
  // This code is only for demonstration purposes.
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });
  });
});

// Insecure route with command injection vulnerability
app.post('/run-command', (req, res) => {
  const command = req.body.command;

  // Execute the command (insecure)
  // In a real application, you should never execute user-provided input as a command.
  // This code is only for demonstration purposes.
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: 'Command execution error' });
    }

    return res.status(200).json({ output: stdout });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
