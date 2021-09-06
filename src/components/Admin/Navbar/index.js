import React from "react";
import "./style.scss";
import Icon from "react-icons-kit";
import { Images } from "../../../utils/Images";
import { ic_menu } from "react-icons-kit/md";

const Index = ({ toggle }) => {
  return (
    <div className="custom-navbar">
      <div className="d-flex">
        <div>
          <ul>
            <li className="d-lg-none">
              <button
                type="button"
                className="btn btn-sm shadow-none"
                onClick={toggle}
              >
                <Icon icon={ic_menu} size={20} />
              </button>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <ul>
            <li>
              <p className="mb-0 text-capitalize">suneel</p>
            </li>
            <li>
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
