import "./App.css";
import { User } from "./User";

function App() {
  const users = [
    { name: "Marouane", age: 21 },
    { name: "Messi", age: 35 },
    { name: "Ronaldo", age: 38 },
  ];
  return (
    <div className="App">
      {users.map((user, key) => {
        return <User key={key} name={user.name} age={user.age} />;
      })}
    </div>
  );
}

export default App;
