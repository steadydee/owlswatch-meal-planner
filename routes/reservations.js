const express = require('express');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { parseCsv } = require(path.join(__dirname, '..', 'services', 'parseCsv.js'));
const { generateMealPlan } = require(path.join(__dirname, '..', 'lib',      'menu_plan.js'));

const router = express.Router();

router.post('/', (req, res) => {
  const uploadDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Instantiate IncomingForm correctly
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.filepath || file.path;
    fs.readFile(filePath, 'utf8', async (readErr, data) => {
      if (readErr) {
        console.error('File read error:', readErr);
        return res.status(500).json({ error: 'Error reading file' });
      }

      let reservations;
      try {
        reservations = parseCsv(data);
      } catch (parseErr) {
        console.error('CSV parse error:', parseErr);
        return res.status(400).json({ error: 'Error parsing CSV' });
      }

      try {
        const plan = await generateMealPlan(reservations);
        res.json({ content: plan });
      } catch (genErr) {
        console.error('Meal plan generation error:', genErr);
        res.status(500).json({ error: 'Error generating meal plan' });
      }
    });
  });
});

module.exports = router;

