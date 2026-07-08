import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        EMS Dashboard
      </div>

      <div className="nav-links">
        <Link to="/">Departments</Link>
        <Link to="/employees">Employees</Link>
      </div>

    </nav>
  );
}

export default Navbar;