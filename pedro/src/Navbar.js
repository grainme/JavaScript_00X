import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/About"}>About</Link>
    </div>
  );
}
