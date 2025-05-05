const { parseISO, eachDayOfInterval, format } = require('date-fns');

function generateMealPlan(reservations) {
  const mealsByDate = {};

  reservations.forEach((res) => {
    const name = res['Name'];
    const guestCount = parseInt(res['Guest Count'], 10) || 0;
    const type = (res['Guest Type'] || '').toLowerCase();
    const earlyTour = (res['Early Tour'] || '').toLowerCase() === 'yes';
    const checkIn = parseISO(res['Check-in']);
    const checkOut = parseISO(res['Check-out']);

    const stayDates = eachDayOfInterval({ start: checkIn, end: checkOut });

    stayDates.forEach((date, index) => {
      const day = format(date, 'yyyy-MM-dd');
      if (!mealsByDate[day]) {
        mealsByDate[day] = { breakfast: 0, lunch: 0, dinner: 0, snack_morning: 0 };
      }

      if (type === 'overnight') {
        mealsByDate[day].breakfast += guestCount;
        mealsByDate[day].lunch += guestCount;
        mealsByDate[day].dinner += guestCount;
        if (earlyTour && index === 0) {
          mealsByDate[day].snack_morning += guestCount;
        }
      } else if (type === 'pasadia_standard') {
        mealsByDate[day].lunch += guestCount;
      } else if (type === 'pasadia_birding') {
        mealsByDate[day].breakfast += guestCount;
        mealsByDate[day].lunch += guestCount;
        mealsByDate[day].snack_morning += guestCount;
      }
    });
  });

  // Generate text output
  let output = '### Meal Plan Summary\n\n';
  Object.keys(mealsByDate).sort().forEach((date) => {
    const m = mealsByDate[date];
    output += `**Date: ${date}**\n`;
    output += `- Breakfast: ${m.breakfast}\n`;
    output += `- Lunch: ${m.lunch}\n`;
    output += `- Dinner: ${m.dinner}\n`;
    output += `- Birding Snack: ${m.snack_morning}\n\n`;
  });

  return output;
}

module.exports = { generateMealPlan };
