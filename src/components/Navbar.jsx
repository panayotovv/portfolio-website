import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav" aria-label="Main Navigation">
      <ul>
        <li> 
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-house" />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/skills" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-feather" />
            <span>Skills</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-user" />
            <span>About</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
            <i className="fa-solid fa-folder"/>
            <span>Projects</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
