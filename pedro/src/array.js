import "./App.css";

function App() {
  const names = ["Marouane", "Zakaria", "Hassan", "Soufiane", "Houssam"];

  return (
    <div className="App">
      {names.map((name, key) => {
        return <h1 key={key}>{name}</h1>;
      })}
    </div>
  );
}

export default App;

// map is used to return some sort of JSX
