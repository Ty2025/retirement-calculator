
function App() {

  
 return (
  <>
  <form style={{ width: '50%', margin: 'auto', paddingTop: '20px' }}>
  <div className="mb-3">
    <label className="form-label">Current Age</label>
    <input type="email" className="form-control" id="currentAgeInput"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Retirement Age</label>
    <input type="password" className="form-control" id="retirementAgeInput"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Monthly Contributions</label>
    <input type="password" className="form-control" id="monthlyContributionInput"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Expected Annual investment return %</label>
    <input type="password" className="form-control" id="percentageInput"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Calculate</button>
</form>
  </>
 )
}

export default App