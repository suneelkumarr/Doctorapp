import React, { useEffect, useState } from "react";
import "./style.scss";
import { Icon } from "react-icons-kit";
import {
  ic_check_circle,
  ic_warning,
  ic_announcement,
  ic_error,
} from "react-icons-kit/md";

const Index = ({ toast, position, title, message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (show) {
    return (
      <div className={`notification-container ${position} ${toast}`}>
        <div className="d-flex">
          <div>
            {toast === "success" ? (
              <Icon
                icon={ic_check_circle}
                size={25}
                style={{ color: "#fff" }}
              />
            ) : toast === "warning" ? (
              <Icon icon={ic_warning} size={25} style={{ color: "#fff" }} />
            ) : toast === "info" ? (
              <Icon
                icon={ic_announcement}
                size={25}
                style={{ color: "#fff" }}
              />
            ) : toast === "error" ? (
              <Icon icon={ic_error} size={25} style={{ color: "#fff" }} />
            ) : null}
          </div>
          <div className="pl-2">
            <h6 className="notification-title">{title}</h6>
            <p className="notification-message">{message}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Index;
