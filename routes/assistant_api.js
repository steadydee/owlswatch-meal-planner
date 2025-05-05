const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

// Load API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",  // or "gpt-3.5-turbo" if preferred
      messages: [
        { role: "system", content: "You are the Owl's Watch assistant. Help the cook plan meals and update internal rules in a natural, conversational way." },
        { role: "user", content: userMessage }
      ]
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ reply: "Sorry, something went wrong talking to the assistant." });
  }
});

module.exports = router;
