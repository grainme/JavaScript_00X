import "./App.css";

function App() {
  return (
    <div className="App">
      <User name="Marouane" age={22} email="type@gmail.com" />
      <User name="Hitman" age={42} email="Hitman@gmail.com" />
    </div>
  );
}

const User = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h1>{props.age}</h1>
      <h1>{props.email}</h1>
    </div>
  );
};

export default App;

// instead of making the data static, we're going to use props :)
// ofc to make it dynamic
// remember to use the template literal
