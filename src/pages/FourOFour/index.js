import React from "react";
import "./style.scss";
import { Images } from "../../utils/Images";

const Index = () => {
  return (
    <div className="four-o-four">
      <div className="flex-center flex-column text-center">
        <img src={Images.FourOFour} className="img-fluid" alt="..." />
        <h5>You are following wrong way !!</h5>
      </div>
    </div>
  );
};

export default Index;
