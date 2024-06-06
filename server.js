const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/enhance', (req, res) => {
  const { userInput } = req.body;
  const enhancedText = `Enhanced: ${userInput}`;
  res.json({ enhancedText });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'iframe.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
