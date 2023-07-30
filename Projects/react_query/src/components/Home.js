import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import "../styles/App.css";

export function Home() {
  const {data: catData,isLoading,refetch,} = useQuery(["cat"], () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <p>{catData.fact}</p>
      <button onClick={refetch}>Another Fact</button>
    </div>
  );
}
