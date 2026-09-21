const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

const { calculateProfit } = require("./calculateProfit");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/calculate", (req, res) => {
  const { incomeItems, expenseItems, profitSharePercentage, salary } = req.body;
  if (
    incomeItems === undefined ||
    expenseItems === undefined ||
    profitSharePercentage === undefined ||
    salary === undefined
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (
    !Array.isArray(incomeItems) ||
    !Array.isArray(expenseItems) ||
    typeof profitSharePercentage !== "number" ||
    typeof salary !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input types" });
  }
  const totalRentalIncome = incomeItems.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);

  const profit = calculateProfit(totalRentalIncome, totalExpense);

  const profitShare = profit * profitSharePercentage;

  const totalIncome = profitShare + salary;

  const taxableIncome = Math.max(0, totalIncome - 12570);

  let tax;

  if (taxableIncome <= 37700) {
    tax = taxableIncome * 0.2;
  } else if (taxableIncome <= 150000) {
    tax = 7540 + (taxableIncome - 37700) * 0.4;
  } else {
    tax = 7540 + (150000 - 37700) * 0.4 + (taxableIncome - 150000) * 0.45;
  }

  const netIncome = totalIncome - tax;

  res.json({
    totalRentalIncome,
    totalExpense,
    profit,
    profitShare,
    totalIncome,
    taxableIncome,
    tax,
    netIncome,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
