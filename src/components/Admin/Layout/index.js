import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import Icon from "react-icons-kit";
import { apiURL } from "../../../utils/apiURL";
import { standby } from "react-icons-kit/iconic";
import { NavLink, useHistory } from "react-router-dom";
import { ic_dashboard, ic_people } from "react-icons-kit/md";

import Navbar from "../Navbar/index";

const Index = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  useEffect(() => {
    // Fetch Notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (response.status === 200) {
          setNotifications(response.data);
          setMessages(response.data);
        }
      } catch (error) {
        if (error) {
          console.log(error.response);
        }
      }
    };

    fetchNotifications();
  }, []);

  // Logout
  const doLogout = async () => {
    try {
      setLogout(true);
      const response = await axios(`${apiURL}/admin/auth/logout`, header);
      if (response.status === 200) {
        setTimeout(() => {
          setLogout(false);
          localStorage.clear();
          history.push("/");
        }, 1000);
      }
    } catch (error) {
      if (error) {
        setTimeout(() => {
          setLogout(false);
          localStorage.clear();
          history.push("/");
        }, 1000);
      }
    }
  };

  return (
    <div className="layout">
      {/* Navbar */}
      <div className="navbar-container shadow-sm">
        {notifications && messages ? (
          <Navbar toggle={() => setShow(!show)} />
        ) : null}
      </div>

      {/* Sidebar */}
      <div className="sidebar-container">
        <div
          className={show ? "sidebar shadow open-sidebar" : "sidebar shadow"}
        >
          <ul>
            {/* Dashboard */}
            <li>
              <NavLink
                exact
                to="/admin/"
                activeClassName="isActive"
                type="button"
                className="btn shadow-none"
              >
                <Icon icon={ic_dashboard} size={20} />
                Dashboard
              </NavLink>
            </li>

            {/* doctors */}
            <li>
              <NavLink
                exact
                to="/admin/doctor"
                activeClassName="isActive"
                type="button"
                className="btn shadow-none"
              >
                <Icon icon={ic_people} size={20} />
                Doctors
              </NavLink>
            </li>

            {/* admins */}
            <li>
              <NavLink
                exact
                to="/admin/admin-list"
                activeClassName="isActive"
                type="button"
                className="btn shadow-none"
              >
                <Icon icon={ic_people} size={20} />
                Admin
              </NavLink>
            </li>

            {/* Logout */}
            <li>
              <button
                type="button"
                className="btn shadow-none"
                onClick={doLogout}
                disabled={isLogout}
              >
                <Icon icon={standby} size={18} />
                {isLogout ? <span>Logging out...</span> : <span>Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
