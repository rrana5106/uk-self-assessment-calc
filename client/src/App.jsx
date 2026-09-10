import { useState } from "react";

import "./App.css";

function App() {
  const [grossRentalIncome, setGrossRentalIncome] = useState(0);
  const [grossRentalExpenses, setGrossRentalExpenses] = useState(0);
  const [profitSharePercentage, setProfitSharePercentage] = useState(0.5); // Default to 50%
  const [salary, setSalary] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <>
      <div className="App">
        <div className="card">
          <h1>UK Self Assessment Calculator</h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setResult(null);
              setError(null);
              const data = {
                grossRentalIncome,
                grossRentalExpenses,
                profitSharePercentage,
                salary,
              };
              console.log("Sending data to server:", data);
              try {
                const response = await fetch(import.meta.env.VITE_API_URL, {
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

                setError(error.message);
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="grossRentalIncome">
                Enter the gross rental income: £
              </label>
              <input
                id="grossRentalIncome"
                type="number"
                value={grossRentalIncome}
                onChange={(e) => {
                  setGrossRentalIncome(Number(e.target.value));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="grossRentalExpenses">
                Enter the gross rental expenses: £
              </label>
              <input
                id="grossRentalExpenses"
                type="number"
                value={grossRentalExpenses}
                onChange={(e) => {
                  setGrossRentalExpenses(Number(e.target.value));
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profitSharePercentage">
                Enter the profit share percentage: %
              </label>
              <input
                id="profitSharePercentage"
                type="number"
                value={profitSharePercentage * 100}
                onChange={(e) => {
                  setProfitSharePercentage(Number(e.target.value) / 100);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">
                Enter the salary: £
              </label>
              <input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => {
                  setSalary(Number(e.target.value));
                }}
              />
            </div>
            <button type="submit">Calculate</button>
            {result && (
              <div className="result">
                <h2>Results</h2>
                <div className="result-grid">
                  <p>Profit: £{result.profit.toFixed(2)}</p>
                  <p>Profit Share: £{result.profitShare.toFixed(2)}</p>
                  <p>Total Income: £{result.totalIncome.toFixed(2)}</p>
                  <p>Taxable Income: £{result.taxableIncome.toFixed(2)}</p>
                  <p>Income Tax: £{result.incomeTax.toFixed(2)}</p>
                </div>
              </div>
            )}

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
