import { useState, useEffect } from "react";
import InputField from "./components/inputField";
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContributions, setMonthlyContributions] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [growthData, setGrowthData] = useState<number[]>([]);
  const [ageError, setAgeError] = useState<string>("");


  useEffect(() => {
    // Convert to numbers for calculation
    const curAge = Number(currentAge);
    const retAge = Number(retirementAge);
    const curSavings = Number(currentSavings);
    const contrib = Number(monthlyContributions);
    const annReturn = Number(annualReturn);
    const years = retAge - curAge;
    if (retAge && curAge && retAge <= curAge) {
      setAgeError("Retiring before you were born? Time travel isn't supported yet! 🚀");
    } else {
      setAgeError("");
    }
    if (
      !currentAge || !retirementAge || !monthlyContributions || !annualReturn || !currentSavings ||
      years <= 0 || contrib < 0 || annReturn < 0 || curSavings < 0
    ) {
      setResult(null);
      setGrowthData([]);
      return;
    }
    const months = years * 12;
    const monthlyRate = annReturn / 100 / 12;
    // FV = P * [((1 + r)^n - 1) / r] + PV * (1 + r)^n
    const fv = contrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) + curSavings * Math.pow(1 + monthlyRate, months);
    setResult(fv);

    // Calculate yearly growth
    let balances: number[] = [];
    for (let y = 1; y <= years; y++) {
      let monthsThisYear = y * 12;
      let yearBalance = contrib * ((Math.pow(1 + monthlyRate, monthsThisYear) - 1) / monthlyRate) + curSavings * Math.pow(1 + monthlyRate, monthsThisYear);
      balances.push(yearBalance);
    }
    setGrowthData(balances);
  }, [currentAge, retirementAge, currentSavings, monthlyContributions, annualReturn]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-primary mb-4">
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0">Retirement Calculator</h2>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 border-end mb-4 mb-md-0">
                  <form onSubmit={e => e.preventDefault()}>
                    <InputField
                      label="Current Age"
                      type="number"
                      id="currentAge"
                      value={currentAge}
                      min={0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, "");
                        // Remove leading zeros
                        if (val.length > 1 && val.startsWith("0")) val = val.replace(/^0+/, "");
                        setCurrentAge(val);
                      }}
                    />
                    <InputField
                      label="Current Savings"
                      type="number"
                      id="currentSavings"
                      value={currentSavings}
                      min={0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length > 1 && val.startsWith("0")) val = val.replace(/^0+/, "");
                        setCurrentSavings(val);
                      }}
                    />
                    <InputField
                      label="Retirement Age"
                      type="number"
                      id="retirementAge"
                      value={retirementAge}
                      min={0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length > 1 && val.startsWith("0")) val = val.replace(/^0+/, "");
                        setRetirementAge(val);
                      }}
                    />
                    <InputField
                      label="Monthly Contributions"
                      type="number"
                      id="monthlyContributions"
                      value={monthlyContributions}
                      min={0}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length > 1 && val.startsWith("0")) val = val.replace(/^0+/, "");
                        setMonthlyContributions(val);
                      }}
                    />
                    <InputField
                      label="Expected Annual investment return %"
                      type="text"
                      id="annualReturn"
                      value={annualReturn}
                      min={0}
                      inputMode="decimal"
                      pattern="^\d*\.?\d*$"
                      onChange={e => {
                        let val = e.target.value.replace(/[^\d.]/g, "");
                        // Only allow one decimal point
                        val = val.replace(/(\..*)\./g, '$1');
                        // Remove leading zeros unless before decimal
                        if (val.length > 1 && val.startsWith("0") && val[1] !== ".") val = val.replace(/^0+/, "");
                        setAnnualReturn(val);
                      }}
                    />
                  </form>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                  {ageError && (
                    <div className="alert alert-danger text-center" role="alert">
                      <h5 className="mb-0">{ageError}</h5>
                    </div>
                  )}
                  {!ageError && result !== null && (
                    <div>
                      <div className="alert alert-success text-center" role="alert">
                        <h4 className="mb-0">Estimated Retirement Savings: <span className="fw-bold">R{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></h4>
                      </div>
                      {growthData.length > 0 && (
                        <div className="bg-white p-3 rounded shadow-sm mt-4">
                          <Line
                            data={{
                              labels: Array.from({ length: growthData.length }, (_, i) => {
                                const baseAge = Number(currentAge) || 0;
                                return `${baseAge + i + 1}`;
                              }),
                              datasets: [
                                {
                                  label: 'Projected Balance',
                                  data: growthData,
                                  borderColor: 'rgba(54, 162, 235, 1)',
                                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                  fill: true,
                                  tension: 0.2,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              plugins: {
                                legend: { display: false },
                                title: { display: true, text: 'Retirement Savings Growth Over Time' },
                              },
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  ticks: {
                                    callback: function(value) {
                                      return 'R' + Number(value).toLocaleString();
                                    }
                                  }
                                },
                                x: {
                                  title: { display: true, text: 'Age' }
                                }
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;