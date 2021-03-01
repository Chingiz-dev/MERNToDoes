import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import st from "./NavBar.module.css";

export const NavBar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav className={st.nav}>
      <div className="main_width">
        <ul className={st.ul}>
          <li>
            <NavLink to="/way">My way</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">My contacts</NavLink>
          </li>
          <li>
            <NavLink to="/todos">My todos</NavLink>
          </li>
          <li>
            <NavLink to="/addtodo">add new todo</NavLink>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
