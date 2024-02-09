import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.scss";

export const Menu: React.FC = React.memo(({}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="dm">
      <nav className="nav">
        <ul>
          {localStorage.userid ? (
            <>
              <li>
                <button
                  className="btn1"
                  onClick={() => {
                    delete localStorage.userid;
                    navigate("/");
                  }}
                >
                  logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/"}>login</NavLink>
              </li>
              <li>
                <NavLink to={"register"}>register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
});
