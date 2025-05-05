const express = require('express');
const { OpenAI } = require('openai');
const ruleSet = require('../rulesStore');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const rulesAsText = ruleSet.meal_logic.map(r => `- ${r}`).join('\n');
  const drinksAsText = ruleSet.drinks.lunch_dinner_rotation.map(d => `- ${d}`).join('\n');
  const dessertsAsText = ruleSet.desserts.map(d => `- ${d}`).join('\n');

  const systemPrompt = `
You are the Owl's Watch assistant. You help the cook plan meals and apply internal food rules.

Current meal logic:
${rulesAsText}

Desserts in order of preference:
${dessertsAsText}

Current lunch/dinner drink options:
${drinksAsText}
`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
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
