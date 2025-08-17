import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';
import bgImage from './images/b.png'; // ✅ Import your background image

const Layout = () => {
  return (
    <div
      className="app-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
            <NavLink to="/" end className="nav-link">Home</NavLink>
          </li>
          <li>
            <NavLink to="/register" className="nav-link">Registration</NavLink>
          </li>
          <li>
            <NavLink to="/all-cases" className="nav-link">All Cases</NavLink>
          </li>
          <li>
            <NavLink to="/match" className="nav-link">Match</NavLink>
          </li>
          <li>
            <NavLink to="/help" className="nav-link">Help</NavLink>
          </li>
        </ul>
      </nav>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
