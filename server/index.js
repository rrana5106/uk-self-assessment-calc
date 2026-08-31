// require the functions from the calculateProfit.js file
const { calculateProfit, displayProfit } = require("./calculateProfit");

// import the express  modules
const express = require("express");

// import the cors module
const cors = require("cors");

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const PORT = 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

// Handle GET request at the root route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Profit Calculator API! Use the /calculate route to calculate profit.",
  );
});

// Handle POST request at the /calculate route
app.post("/calculate", async (req, res) => {
  // Extract the gross rental income and gross rental expenses from the request body
  const { grossRentalIncome, grossRentalExpenses, salary } = req.body;

  // Call the calculateProfit function with the provided values
  const profit = calculateProfit(grossRentalIncome, grossRentalExpenses);

  const mySharePercentage = 0.5; // Define the percentage for your share

  const profitShare = profit * mySharePercentage;

  const totalIncome = profitShare + salary; // total income

  const taxableIncome = Math.max(0, totalIncome - 12570); // Subtract the personal allowance
  let incomeTax = 0; // Initialize incomeTax variable
  if (taxableIncome < 37700) {
    incomeTax = taxableIncome * 0.2; // 20% incomeTax rate for income up to £37,700
    console.log(`The total incomeTax is £${incomeTax}`);
  } else if (taxableIncome >= 37700 && taxableIncome <= 112570) {
    incomeTax = 7540 + (taxableIncome - 37700) * 0.4; // 20% incomeTax for the first £37,700 and 40% for the rest
    console.log(`The total incomeTax is £${incomeTax}`);
  } else {
    incomeTax = 7540 + 74870 * 0.4 + (taxableIncome - 112570) * 0.45; // 20% for the first £37,700, 40% for the next £74870, and 45% for the rest
    console.log(`The total incomeTax is £${incomeTax}`);
  }
  // Respond with the calculated profit
  res.json({ profit, profitShare, totalIncome, taxableIncome, incomeTax });
});

/* // Wildcard route to handle undefined routes
app.all("*", (req, res) => {
  res.status(404).send("Route not found");
}); */

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
