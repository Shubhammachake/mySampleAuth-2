import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav id="nav">
      <Link to="/">Home</Link>
      <div className="groupbtn">
        <Link to="/Login">
          <button className="btns">Login</button>
        </Link>
      </div>
    </nav>
  );
}
