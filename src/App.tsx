import { useState } from "react";
import InputField from "./components/inputField";

function App() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [monthlyContributions, setMonthlyContributions] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculation logic: future value of a series formula
    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyRate = annualReturn / 100 / 12;
    // FV = P * [((1 + r)^n - 1) / r]
    const fv = monthlyContributions * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    setResult(fv);
  };

  return (
    <>
      <form style={{ width: '50%', margin: 'auto', paddingTop: '20px' }} onSubmit={handleSubmit}>
        <InputField
          label="Current Age"
          type="number"
          id="currentAge"
          value={currentAge}
          min={0}
          onChange={e => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && Number(val) >= 0) setCurrentAge(val === '' ? 0 : Number(val));
          }}
        />
        <InputField
          label="Retirement Age"
          type="number"
          id="retirementAge"
          value={retirementAge}
          min={0}
          onChange={e => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && Number(val) >= 0) setRetirementAge(val === '' ? 0 : Number(val));
          }}
        />
        <InputField
          label="Monthly Contributions"
          type="number"
          id="monthlyContributions"
          value={monthlyContributions}
          min={0}
          onChange={e => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && Number(val) >= 0) setMonthlyContributions(val === '' ? 0 : Number(val));
          }}
        />
        <InputField
          label="Expected Annual investment return %"
          type="number"
          id="annualReturn"
          value={annualReturn}
          min={0}
          onChange={e => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && Number(val) >= 0) setAnnualReturn(val === '' ? 0 : Number(val));
          }}
        />
        <button type="submit" className="btn btn-primary">Calculate</button>
      </form>
      {result !== null && (
        <div style={{ width: '50%', margin: 'auto', paddingTop: '20px' }}>
          <h4>Estimated Retirement Savings: R{result.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
        </div>
      )}
    </>
  );
}

export default App;