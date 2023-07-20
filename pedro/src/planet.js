import "./App.css";

function App() {
  return <GazPlanet />;
}

const GazPlanet = () => {
  const planets = [
    { name: "Mars", isGazPlanet: false },
    { name: "Earth", isGazPlanet: false },
    { name: "Jupyter", isGazPlanet: true },
    { name: "Venus", isGazPlanet: false },
    { name: "Uranus", isGazPlanet: true },
  ];
  return planets.map((planet, key) => {
    return planet.isGazPlanet && <h1>{planet.name}</h1>;
  });
};

export default App;
