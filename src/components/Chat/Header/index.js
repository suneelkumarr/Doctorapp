import React from "react";
import "./style.scss";
import { Images } from "../../../utils/Images";
import Icon from "react-icons-kit";
import { ic_close } from "react-icons-kit/md";
import { useHistory } from "react-router-dom";

const Index = ({ sender, reciver }) => {
  const history = useHistory();
  const closeChat = () => history.push("/patient");

  return (
    <div className="chat-header shadow-sm">
      <div className="row">
        {/* Reciver */}
        <div className="col-6">
          <div className="d-flex">
            <div className="image-container rounded-circle mx-2">
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            </div>
            <div className="d-none d-sm-block">
              <h6>{reciver.name}</h6>
            </div>
          </div>
        </div>

        {/* Sender */}
        <div className="col-6">
          <div className="d-flex">
            <div className="d-none d-sm-block ml-auto">
              <h6>{sender.name}</h6>
            </div>
            <div className="image-container rounded-circle mx-2 ml-auto ml-sm-0">
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            </div>
            <div>
              <button
                type="button"
                className="btn rounded-circle shadow-none"
                onClick={closeChat}
              >
                <Icon icon={ic_close} size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
