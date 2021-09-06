import React from "react";
import "./style.scss";
import { Images } from "../../utils/Images";

const Index = () => {
  return (
    <div className="loader">
      <div className="flex-center flex-column">
        <img src={Images.Loading} className="img-fluid" alt="..." />
      </div>
    </div>
  );
};

export default Index;
