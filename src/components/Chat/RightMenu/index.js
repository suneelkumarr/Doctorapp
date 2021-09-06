import React from "react";
import Icon from "react-icons-kit";
import "./style.scss";
import { ic_cloud_download } from "react-icons-kit/md";

const Index = ({ files }) => {
  return (
    <div className="right-menu-container">
      {files && files.length > 0
        ? files &&
          files.map((file, i) => (
            <div className="file-container" key={i}>
              <a href={file} download>
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
