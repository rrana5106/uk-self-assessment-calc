import { useState } from "react";

import "./App.css";

function App() {
  const [grossRentalIncome, setGrossRentalIncome] = useState(0);
  const [grossRentalExpenses, setGrossRentalExpenses] = useState(0);
  const [salary, setSalary] = useState(0);
  const [result, setResult] = useState(null);

  return (
    <>
      <div className="App">
        <h1>UK Self Assessment Calculator</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = {
              grossRentalIncome,
              grossRentalExpenses,
              salary,
            };
            console.log("Sending data to server:", data);
            try {
              const response = await fetch("http://localhost:3001/calculate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(data),
              });
              if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
              }
              const responseData = await response.json();
              console.log("Received data from server:", responseData);

              setResult(responseData);
            } catch (error) {
              console.error("Error during fetch:", error);
            }
          }}
        >
          <p>
            Enter the gross rental income: £
            <input
              type="number"
              value={grossRentalIncome}
              onChange={(e) => {
                setGrossRentalIncome(Number(e.target.value));
              }}
            />
          </p>
          <p>
            Enter the gross rental expenses: £
            <input
              type="number"
              value={grossRentalExpenses}
              onChange={(e) => {
                setGrossRentalExpenses(Number(e.target.value));
              }}
            />
          </p>
          <p>
            Enter the salary: £
            <input
              type="number"
              value={salary}
              onChange={(e) => {
                setSalary(Number(e.target.value));
              }}
            />
          </p>
          <button type="submit">Calculate</button>
          {result && (
            <div className="result">
              <h2>Results</h2>
              <p>Profit: £{result.profit}</p>
              <p>Profit Share: £{result.profitShare}</p>
              <p>Total Income: £{result.totalIncome}</p>
              <p>Taxable Income: £{result.taxableIncome}</p>
              <p>Income Tax: £{result.incomeTax.toFixed(2)}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
