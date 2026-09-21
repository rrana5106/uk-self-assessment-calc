function calculateProfit(income, expenses) {
  return income - expenses;
}

function displayProfit() {
  console.log(calculateProfit(5, 10));
}

displayProfit();

module.exports = { calculateProfit, displayProfit };
