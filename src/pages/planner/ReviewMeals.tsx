import React, { useState } from 'react';

interface MealEntry {
  date: string;
  guests: string;
  breakfast: string;
  lunchDinner: string;
  dessert: string;
  notes: string;
}

const sampleData: MealEntry[] = [
  { date: 'May 5', guests: 'Diego De Dobbelaer (+3)', breakfast: 'N/A', lunchDinner: 'Tikka Masala', dessert: 'Banana Foster', notes: 'old mother can’t walk' },
  { date: 'May 6', guests: 'Diego De Dobbelaer', breakfast: 'Farmhouse Skillet', lunchDinner: 'Beef Stew', dessert: 'Chia Pudding', notes: 'avoid repeats' },
];

export default function ReviewMeals() {
  const [meals, setMeals] = useState<MealEntry[]>(sampleData);

  const updateCell = (index: number, field: keyof MealEntry, value: string) => {
    const updated = [...meals];
    updated[index] = { ...updated[index], [field]: value };
    setMeals(updated);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Review Meals</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Guest(s)</th>
            <th>Breakfast</th>
            <th>Lunch / Dinner</th>
            <th>Dessert</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((m, i) => (
            <tr key={i}>
              <td>{m.date}</td>
              <td>{m.guests}</td>
              <td>
                <input
                  type="text"
                  value={m.breakfast}
                  onChange={(e) => updateCell(i, 'breakfast', e.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={m.lunchDinner}
                  onChange={(e) => updateCell(i, 'lunchDinner', e.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={m.dessert}
                  onChange={(e) => updateCell(i, 'dessert', e.target.value)}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <textarea
                  value={m.notes}
                  onChange={(e) => updateCell(i, 'notes', e.target.value)}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
