import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      <button><Link to={"/"}>Home</Link></button>
      <button><Link to={"/profile"}>Profile</Link></button>
      <button><Link to={"/contact"}>Contact</Link></button>
    </div>
  );
}
