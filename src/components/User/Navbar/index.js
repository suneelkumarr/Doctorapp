import React, { useState, useEffect } from "react";
import "./style.scss";

import { Icon } from "react-icons-kit";
import { Link, NavLink } from "react-router-dom";
import { ic_menu, ic_close } from "react-icons-kit/md";
import { Images } from "../../../utils/Images";

const Index = () => {
  const [isShow, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || undefined);
  console.log(token);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  
  return (
    <div className="custom-navnar">
      <div className="main-navbar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                {/*logo */}
                <div className="logo">
                  <Link to="/">
                    <img src={Images.Logo} />
                  </Link>
                </div>
                {/* Toggle BArs */}

                <div className="ml-auto d-lg-none">
                  <Icon
                    icon={ic_menu}
                    size={25}
                    className="bars"
                    onClick={() => setShow(true)}
                  ></Icon>
                </div>
                {/* Menu bar backdrop */}
                <div
                  className={
                    isShow
                      ? "ml-auto page-links-menu-bar show-backdrop"
                      : "ml-auto page-links-menu-bar"
                  }
                >
                  <div className="menu-close d-lg-none">
                    <Icon
                      icon={ic_close}
                      size={35}
                      className="close-icon"
                      onClick={() => setShow(false)}
                    />
                  </div>
                  {/*menu */}
                  <div className={isShow ? "my-menu open-sidemenu" : "my-menu"}>
                    <ul>
                      <li>
                        <NavLink activeClassName="is-Active" exact to="/">
                          home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          activeClassName="is-Active"
                          exact
                          to="/about-us"
                        >
                          about
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          activeClassName="is-Active"
                          exact
                          to="/contact-us"
                        >
                          contact
                        </NavLink>
                      </li>
                      {token ? (
                        <li>
                          <NavLink
                            activeClassName="is-Active"
                            exact
                            to="/login"
                          >
                            profile
                          </NavLink>
                        </li>
                      ) : (
                        <li>
                          <NavLink
                            activeClassName="is-Active"
                            exact
                            to="/login"
                          >
                            login
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="break"></div>
    </div>
  );
};

export default Index;
