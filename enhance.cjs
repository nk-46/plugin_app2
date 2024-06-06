require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.static('assets'));
app.use(cors());
app.use(bodyParser.json());

app.get('/assets/enhance.cjs', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'assets', 'enhance.cjs'));
});

// OpenAI client setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Enhance text endpoint
app.post('/enhance', async (req, res) => {

    const userInput = req.body.userInput;  // Capture user input from the form
    if (!userInput) {
        return res.status(400).json({ message: 'No input provided' });
    }
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                { 
                    role: "system", 
                    content: "Rephrase this in a more technical and professional manner as if you are a professional talking to a customer: " + userInput 
                }
            ],
            max_tokens: 250
        });
        const enhancedText = response.choices[0].message.content;
        res.json({ enhancedText });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});