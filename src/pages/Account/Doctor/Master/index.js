import React, { useState, useEffect, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";
import { Switch, Route, useHistory } from "react-router-dom";
import Icon from "react-icons-kit";
import { ic_dehaze } from "react-icons-kit/md";
import { Images } from "../../../../utils/Images";

import SideMenuComponent from "../../../../components/Doctor/SideMenu/index";
import ProfileUpdateModal from "../../../../components/Doctor/Model/ProfileUpdate/index";
import DashboardIndex from "../Dashboard/index";
import AppointmentsIndex from "../Appointment/index";
import RequestsIndex from "../Request/index";

import StepOne from "../../../../components/Doctor/ProfileUpdateSteps/StepOne";
import StepTwo from "../../../../components/Doctor/ProfileUpdateSteps/StepTwo";
import StepThree from "../../../../components/Doctor/ProfileUpdateSteps/StepThree";
import StepFour from "../../../../components/Doctor/ProfileUpdateSteps/StepFour";
import StepFive from "../../../../components/Doctor/ProfileUpdateSteps/StepFive";

import Preloader from "../../../../components/Loader/index";

const Master = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [doctor, setDoctor] = useState({});
  const [isDaialog, setDaialog] = useState(false);
  const [step, setStep] = useState(null);
  const id = localStorage.getItem("id");
  const [isLoading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  // Fetch Logged User
  const loggedDoctor = useCallback(async () => {
    try {
      const response = await axios.get(`${apiURL}/doctor/me`, header);
      if (response.status === 200) {
        setDoctor(response.data.doctor);
        setStep(response.data.doctor.updateStep);
        setPreLoading(false);
      }
    } catch (error) {
      if (error) console.log(error.response);
    }
  }, [header]);

  useEffect(() => {
    loggedDoctor();
  }, [id, header, loggedDoctor]);

  // Handle Edit
  const handleProfileEdit = (data) => setDaialog(data);

  // Update Response
  const updateResponse = (responseStep) => {
    loggedDoctor();
    setStep(responseStep);
  };

  // Logout
  const doLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/auth/logout`, header);
      if (response.status === 200) {
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      if (error) {
        localStorage.clear();
        history.push("/");
      }
    }
  };

  // Preloader
  if (preLoading) return <Preloader />;

  // Account if pending
  if (doctor.isApproved === "pending") {
    return (
      <div className="update-page">
        <div className="flex-center flex-column">
          <div className="card rounded-0 border-0 shadow">
            <div className="card-header bg-white p-4">
              <h5 className="mb-0">Hello doctor !</h5>
              <p className="mb-0">
                Your account has been deactivated, fill all field & submit to
                active.
              </p>
            </div>
            <div className="card-body p-4">
              {/* Progress */}
              <small>Profile updated</small>
              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: doctor.updateRange + "%" }}
                  aria-valuenow={doctor.updateRange}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {doctor.updateRange}%
                </div>
              </div>

              {/* Update Steps */}
              {step === 1 ? (
                <StepOne responsestep={updateResponse} id={id} />
              ) : step === 2 ? (
                <StepTwo responsestep={updateResponse} id={id} />
              ) : step === 3 ? (
                <StepThree responsestep={updateResponse} id={id} />
              ) : step === 4 ? (
                <StepFour responsestep={updateResponse} id={id} />
              ) : step === 5 ? (
                <StepFive responsestep={updateResponse} id={id} />
              ) : null}

              <div className="text-center">
                <button
                  type="button"
                  className="btn shadow-none"
                  onClick={doLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Logging out ...</span>
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Account if submitted
  if (doctor.isApproved === "submitted") {
    return (
      <div className="update-page">
        <div className="flex-center flex-column">
          <div className="card rounded-0 border-0 shadow">
            <div className="card-header bg-white p-4">
              <h5 className="mb-0">Hello doctor !</h5>
              <p className="mb-0">
                Your account has been submitted, Please wait for admin approval.
              </p>
            </div>
            <div className="card-body text-center">
              <img
                src={Images.PendingApproval}
                className="img-fluid"
                alt="..."
              />
              <div className="text-center">
                <button
                  type="button"
                  className="btn shadow-none"
                  onClick={doLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Logging out ...</span>
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="master">
      {/* Mobile Navbar */}
      <div className="mobile-navbar d-lg-none p-3">
        <div className="d-flex">
          <div>
            <p>{doctor.name ?? doctor.email}</p>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              className="btn btn-light rounded-circle shadow-none"
              onClick={() => setShow(true)}
            >
              <Icon icon={ic_dehaze} size={25} />
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <div
            className={show ? "backdrop open-backdrop" : "backdrop"}
            onClick={() => setShow(false)}
          ></div>
          <div
            className={show ? "main-sidebar open-main-sidebar" : "main-sidebar"}
          >
            <SideMenuComponent editdialog={handleProfileEdit} doctor={doctor} />
          </div>
        </div>

        {/* Main */}
        <div className="main flex-fill">
          <Switch>
            <Route exact path="/doctor/" component={DashboardIndex} />
            <Route
              exact
              path="/doctor/appointments"
              component={AppointmentsIndex}
            />
            <Route exact path="/doctor/requests" component={RequestsIndex} />
          </Switch>
        </div>
      </div>

      {/* Profile Update Modal */}
      {isDaialog ? <ProfileUpdateModal editdialog={handleProfileEdit} /> : null}
    </div>
  );
};

export default Master;
