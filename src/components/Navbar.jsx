import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav" aria-label="Main Navigation">
      <ul>
        <li>
          <NavLink to="/" end>
            <i className="fa-solid fa-house" />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/skills">
            <i className="fa-solid fa-feather" />
            <span>Skills</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/about">
            <i className="fa-solid fa-user" />
            <span>About</span>
          </NavLink>
        </li>

        <li>
          <a
            href="https://github.com/panayotovv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github" />
            <span>GitHub</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
