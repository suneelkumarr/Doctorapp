import React, { useState } from "react";
import "../styles.scss";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Images } from "../../../utils/Images";
import Icon from "react-icons-kit";
import { ic_done } from "react-icons-kit/md";

toast.configure({ autoClose: 2000 });
const Index = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [accountType, setAccountType] = useState("patient");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      const newData = {
        role: accountType,
        email: data.email,
        password: data.password,
      };

      setLoading(true);
      const response = await axios.post(`${apiURL}/auth/register`, newData);
      if (response.status === 201) {
        toast.success(response.data.message);
        setLoading(false);
        history.push("/login");
      }

      if (response.status === 208) {
        toast.warn(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        toast.warn(error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="flex-center flex-column">
        <div className="card shadow border-0 rounded-0">
          <div className="card-header text-center bg-white border-0">
            <h5 className="mb-0">Choose account type</h5>
          </div>
          <div className="card-body">
            {/* Account type container */}
            <div className="account-type-container d-flex">
              <div className="flex-fill p-2">
                <div
                  className={
                    accountType === "patient"
                      ? "active account p-2"
                      : "account p-2"
                  }
                  onClick={() => setAccountType("patient")}
                >
                  <img
                    src={Images.PatientVector}
                    className="img-fluid"
                    alt="..."
                  />
                  <p>Patient</p>
                  {accountType === "patient" ? (
                    <Icon
                      icon={ic_done}
                      size={26}
                      className="done-icon shadow"
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex-fill p-2">
                <div
                  className={
                    accountType === "doctor"
                      ? "active account p-2"
                      : "account p-2"
                  }
                  onClick={() => setAccountType("doctor")}
                >
                  <img
                    src={Images.DoctorVector}
                    className="img-fluid"
                    alt="..."
                  />
                  <p>Doctor</p>
                  {accountType === "doctor" ? (
                    <Icon
                      icon={ic_done}
                      size={26}
                      className="done-icon shadow"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* Account type message */}
            <div className="account-type-message text-center px-2 px-sm-3 pb-2">
              <h6 className="mb-1 text-muted text-capitalize">
                Hello {accountType}!
              </h6>
              <h6 className="mb-0 text-muted">
                Please fill out the form below to get started
              </h6>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* E-mail */}
              <div className="form-group mb-2">
                {errors.email && errors.email.message ? (
                  <small className="text-danger">
                    {errors.email && errors.email.message}
                  </small>
                ) : (
                  <small>E-mail</small>
                )}
                <input
                  type="text"
                  name="email"
                  {...register("email", {
                    required: "E-mail is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={
                    errors.email
                      ? "form-control shadow-none danger-border"
                      : "form-control shadow-none"
                  }
                  placeholder="E-mail"
                />
              </div>

              {/* Password */}
              <div className="form-group mb-3">
                {errors.password && errors.password.message ? (
                  <small className="text-danger">
                    {errors.password && errors.password.message}
                  </small>
                ) : (
                  <small>Password</small>
                )}
                <input
                  type="password"
                  name="password"
                  className={
                    errors.password
                      ? "form-control shadow-none danger-border"
                      : "form-control shadow-none"
                  }
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 8,
                      message: "Minimun length 8 character",
                    },
                  })}
                  placeholder="Password"
                />
              </div>

              <div className="d-flex">
                <div className="pt-2">
                  <p className="text-muted">
                    Have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="btn shadow-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>Loading...</span>
                    ) : (
                      <span>Register</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
