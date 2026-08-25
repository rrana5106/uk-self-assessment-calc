// this function calculates the profit by subtracting expenses from income
function calculateProfit(income, expenses) {
  return income - expenses;
}
// this function displays the profit value in a formatted string
function displayProfit(value) {
  console.log(`The total profit is £${value}`);
}
// exports the functions to be used in other files
module.exports = { calculateProfit, displayProfit };
