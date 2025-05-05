require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const getMealPlan = require('./services/gpt');
const generatePrompt = require('./prompts/plan_menu');

const assistantApi = require('./routes/assistant_api');
const assistantRouter = require('./routes/assistant');
const uploadPage = require('./routes/upload_page');
const reservationsRouter = require('./routes/reservations');
const dashboard = require('./routes/dashboard'); // ✅ keep below app

const app = express(); // ✅ must come first

const upload = multer({ dest: 'tmp/' });

app.use(express.json());
app.use('/assistant', assistantRouter);
app.use('/api/assistant', assistantApi);
app.use('/planner', uploadPage);
app.use('/api/reservations', reservationsRouter);
app.use('/', dashboard); // ✅ now it's safe to register

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

app.post('/api/reservations/upload', upload.single('file'), async (req, res) => {
  try {
    const csvPath = req.file.path;
    const rawReservations = await parseCSV(csvPath);

    const reservations = rawReservations.map(r => ({
      name: r.Name || r.name,
      startDate: r.StartDate || r.start_date,
      endDate: r.EndDate || r.end_date,
      guests: r.Guests || r.guests,
      notes: r.Notes || r.notes || ''
    }));

    const meals = {
      regular: ['Tikka Masala', 'Beef Stew', 'Chicken Curry', 'Chili'],
      luxury: ['Salmon', 'Steak', 'Korean Beef'],
      salads: ['Quinoa & Kale Chicken Salad', 'Caesar Salad'],
      breakfasts: ['Farmhouse Skillet', 'Smoky Carnitas Skillet', 'Sunrise Colombian Skillet', 'Breakfast Burritos (for bird tours)', 'Acai Bowl', 'Granola and Yogurt'],
      desserts: ['Banana Foster', 'Chia Pudding', 'Brownie with Ice Cream', 'Banana Ice Cream', 'Guava with Finca Cheese', 'Cheesecake', 'Breva with Finca Cheese'],
    };

    const rules = [
      "Follow meal rotation: Regular → Luxury → Regular → Salad → Luxury → (repeat)",
      "Assign one breakfast, one lunch/dinner, one dessert per day",
      "Respect dietary notes",
      "Don't repeat the same meal back-to-back",
    ];

    const prompt = generatePrompt({ reservations, meals, rules });
    const output = await getMealPlan(prompt);

    res.send({ content: output });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
