// require the functions from the calculateProfit.js file
const { calculateProfit,displayProfit } = require("./calculateProfit");

// Step 1: Define the test values
const grossRentalIncome = 15000;
const rentalExpenses = 2000;

// Step 2: Call the calculateProfit function with the test values
const profit = calculateProfit(grossRentalIncome, rentalExpenses);
displayProfit(profit);  
