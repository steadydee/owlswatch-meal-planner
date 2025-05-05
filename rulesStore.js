const ruleSet = {
  meal_logic: [
    "If birding tour, serve coffee and cookies before breakfast.",
    "On the first night of an overnight stay, serve dinner.",
    "Pasadía birding guests eat breakfast and lunch.",
    "Overnight guests checking out eat only breakfast.",
    "Orange juice is always served at breakfast.",
    "Birding tour guests receive breakfast burritos (to eat in the forest).",
    "Follow meal rotation: Regular → Luxury → Regular → Salad → Luxury → (repeat).",
    "Assign one breakfast, one lunch/dinner, and one dessert per guest per day.",
    "Respect dietary notes (e.g., vegetarian).",
    "Avoid repeating the same lunch/dinner meal back-to-back.",
    "Always prefer the top-listed item in each category unless already used."
  ],
  meals: {
    rotation_order: ["regular", "luxury", "regular", "salad", "luxury"],
    regular: [
      "Tikka Masala",
      "Beef Stew",
      "Chicken Curry",
      "Chili"
    ],
    luxury: [
      "Salmon",
      "Steak",
      "Korean Beef"
    ],
    salad: [
      "Quinoa & Kale Chicken Salad",
      "Caesar Salad"
    ]
  },
  breakfasts: [
    "Farmhouse Skillet",
    "Smoky Carnitas Skillet",
    "Sunrise Colombian Skillet",
    "Breakfast Burritos (for bird tours)",
    "Acai Bowl",
    "Granola and Yogurt"
  ],
  breakfast_birding_only: ["Breakfast Burritos (for bird tours)"],
  desserts: [
    "Banana Foster",                // 🍌🍮 Preferred first
    "Chia Pudding",
    "Brownie with Ice Cream",
    "Banana Ice Cream",
    "Guava with Finca Cheese",
    "Cheesecake",
    "Breva with Finca Cheese"
  ],
  drinks: {
    breakfast: ["orange juice", "coffee"],
    snack_morning: ["coffee", "cookies"],
    lunch_dinner_rotation: [
      "mango/guanábana",
      "fruit tea drink",
      "pineapple mango",
      "soda lychee",
      "mora"
    ]
  }
};

module.exports = ruleSet;
