const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API KEY SETUP
const API_KEY = "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"; 

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: "You are Super AI, an intelligent, helpful, and advanced assistant." },
                { role: "user", content: message }
            ]
        }, {
            headers: { 
                'Authorization': `Bearer ${API_KEY}`, 
                'Content-Type': 'application/json' 
            }
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (e) {
        console.error(e.response?.data || e.message);
        res.status(500).json({ reply: "API Error: Kripya server.js mein Groq API Key verify karein." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
