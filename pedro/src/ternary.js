import "./App.css";

function App() {
  const age = 19;
  const isGreen = false;
  return (
    <div className="App">
      {age > 18 ? <h1>University</h1> : <h1>High School</h1>}
      <h2 className={isGreen ? "green" : "red"}>This is colored</h2>
    </div>
  );
}

export default App;
