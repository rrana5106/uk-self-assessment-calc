import { useState } from "react";

import "./App.css";

function App() {
  const [incomeItems, setIncomeItems] = useState([
    { id: 1, label: "", amount: 0 },
  ]);
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

  function removeIncomeItem(id) {
    setIncomeItems(incomeItems.filter((item) => item.id !== id));
  }
  return (
    <>
      <h1>UK SELF ASSESSMENT CALCULATOR</h1>
      Enter the income items: <input type="number" />
      <button onClick={setAddIncome}>Add</button>
      <button>Remove</button>
      <div>
        {incomeItems.map((item) => (
          <div key={item.id}>
            <input
              value={item.label}
              onChange={(e) =>
                updateIncomeItem(item.id, "label", e.target.value)
              }
            />
            <input
              type="number"
              value={item.amount}
              onChange={(e) =>
                updateIncomeItem(item.id, "amount", e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
