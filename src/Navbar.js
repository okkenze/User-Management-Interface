import React from "react";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/viewUser">View Users</Link>
        </li>

        <li>
          <Link to="/createUser">Create User</Link>
        </li>

        <li>
          <button onClick={handleSubmit}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
