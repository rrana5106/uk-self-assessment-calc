import { useState } from "react";

import "./App.css";

function App() {
  const [incomeItems, setIncomeItems] = useState([
    { id: 1, label: "", amount: 0 },
  ]);

  const [expenseItems, setExpenseItems] = useState([
    { id: 1, label: "", amount: 0 },
  ]);

  const [salary, setSalary] = useState(0);

  const [profitSharePercentage, setProfitSharePercentage] = useState(0);

  function setAddExpense() {
    setExpenseItems([
      ...expenseItems,
      { id: Date.now(), label: "", amount: 0 },
    ]);
  }

  function setAddIncome() {
    setIncomeItems([...incomeItems, { id: Date.now(), label: "", amount: 0 }]);
  }

  function updateIncomeItem(id, field, value) {
    setIncomeItems(
      incomeItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function updateExpenseItem(id, field, value) {
    setExpenseItems(
      expenseItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeIncomeItem(id) {
    setIncomeItems(incomeItems.filter((item) => item.id !== id));
  }

  function removeExpenseItem(id) {
    setExpenseItems(expenseItems.filter((item) => item.id !== id));
  }

  function handleSalaryChange(e) {
    setSalary(Number(e.target.value));
  }

  function handleProfitPercentageChange(e) {
    setProfitSharePercentage(Number(e.target.value));
  }

  return (
    <>
      <h1>UK SELF ASSESSMENT CALCULATOR</h1>
      {/* Enter the income items: <input type="number" /> */}
      <div>
        <button onClick={setAddIncome}>Add Income Item</button>
        {incomeItems.map((item) => (
          <div key={item.id}>
            <label htmlFor={`income-label-${item.id}`}>
              Enter the income items:
            </label>
            <input
              id={`income-label-${item.id}`}
              value={item.label}
              onChange={(e) =>
                updateIncomeItem(item.id, "label", e.target.value)
              }
            />
            <input
              type="number"
              value={item.amount}
              onChange={(e) =>
                updateIncomeItem(item.id, "amount", Number(e.target.value))
              }
            />
            <button
              onClick={() => {
                removeIncomeItem(item.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="salary-label">Salary</label>
        <input
          type="number"
          id="salary-label"
          value={salary}
          onChange={handleSalaryChange}
        />
      </div>
      <div>
        <label htmlFor="profitSharePercentage-label">
          Profit Share Percentage
        </label>
        <input
          type="number"
          id="profitSharePercentage-label"
          value={profitSharePercentage}
          onChange={handleProfitPercentageChange}
        />
      </div>

      <div>
        <button onClick={setAddExpense}>Add Expense Item</button>
        {expenseItems.map((item) => (
          <div key={item.id}>
            <label htmlFor={`expense-label-${item.id}`}>
              Enter the expense item:
            </label>
            <input
              id={`expense-label-${item.id}`}
              value={item.label}
              onChange={(e) => {
                updateExpenseItem(item.id, "label", e.target.value);
              }}
            />
            <input
              type="number"
              value={item.amount}
              onChange={(e) =>
                updateExpenseItem(item.id, "amount", Number(e.target.value))
              }
            />
            <button
              onClick={() => {
                removeExpenseItem(item.id);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
