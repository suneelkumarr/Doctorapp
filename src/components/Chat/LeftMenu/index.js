import React from "react";
import "./style.scss";
import Icon from "react-icons-kit";
import { ic_cloud_download } from "react-icons-kit/md";

import testDownload from "../../../assets/static/doctor.jpg";


const Index = ({ files }) => {
  return (
    <div className="left-menu-container">
      {files && files.length > 0
        ? files &&
          files.map((file, i) => (
            <div className="file-container" key={i}>
              <a href={testDownload} download>
                <div className="file-body border">
                  <div className="flex-center flex-column">
                    <Icon
                      icon={ic_cloud_download}
                      size={30}
                      style={{ color: "#dfdfdf" }}
                    />
                  </div>
                </div>
              </a>
            </div>
          ))
        : null}
    </div>
  );
};

export default Index;
