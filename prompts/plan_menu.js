// prompts/plan_menu.js
module.exports = function generatePrompt({ reservations }) {
  // adjust the rules and menu sections as needed
  const header = `
You are the meal planning assistant for a remote mountain ecolodge.

### Rules:
1. Guests arrive at 3:00pm. Serve dinner only on arrival day.
2. Serve breakfast only on departure day. Sometimes lunch, never dinner.
3. Serve all three meals (breakfast, lunch/dinner, dessert) on full days.
4. Rotate meals: Regular → Luxury → Regular → Salad → Luxury.
5. Avoid repeating the same meal two days in a row.

### Meal Rotation:
Regular → Luxury → Regular → Salad → Luxury → (repeat)

### Menu:

**Regular Meals:**
Tikka Masala, Beef Stew, Chicken Curry, Chili

**Luxury Meals:**
Salmon, Steak, Korean Beef

**Salads:**
Quinoa & Kale Chicken Salad, Caesar Salad

**Breakfasts:**
Farmhouse Skillet, Smoky Carnitas Skillet, Sunrise Colombian Skillet, Breakfast Burritos (for bird tours), Acai Bowl, Granola and Yogurt

**Desserts:**
Banana Foster, Chia Pudding, Brownie with Ice Cream, Banana Ice Cream, Guava with Finca Cheese, Cheesecake, Breva with Finca Cheese

### Reservations:
`;

  const list = reservations
    .map(r => `- ${r.name} | ${r.checkIn} to ${r.checkOut} | ${r.guests} guests${r.notes ? ` | Notes: ${r.notes}` : ''}`)
    .join('\n');

  return `${header}${list}

Plan meals for each day of each reservation based on the rules, rotating meals accordingly.

Format:
Date: YYYY-MM-DD  
Guest: [Name]  
Breakfast: ...  
Lunch/Dinner: ...  
Dessert: ...  
Notes: ...

Begin.
`;
};
