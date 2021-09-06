import axios from "axios";
import React, { useState } from "react";
import "./style.scss";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../utils/apiURL";
import { Images } from "../../../utils/Images";
import { Link, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [isLogging, setLogging] = useState(false);
  const token = localStorage.getItem("token");

  const checkRole = (token) => {
    const decode = jwt_decode(token);
    const role = decode.role;
    const id = decode.id;
    localStorage.setItem("id", id);

    if (role === "super_admin" || "admin" || "manager") {
      return history.push("/admin");
    }
  };

  if (token) {
    checkRole(token);
  }

  //submit From

  const onSubmit = async (data) => {
    try {
      setLogging(true);
      const response = await axios.post(`${apiURL}/admin/auth/login`, data);
      if (response.status === 200) {
        setLogging(false);
        localStorage.setItem("token", response.data.token);
        checkRole(response.data.token);
      }
    } catch (error) {
      if (error) {
        setLogging(false);
        toast.warn(error.response.data.message);
      }
    }
  };

  return (
    <div className="auth">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 d-none d-lg-block p-0">
            <div className="image-container">
              <img src={Images.AuthBg} className="img-fluid" alt="..." />
              <div className="overlay">
                <div className="flex-center flex-column">
                  <img src={Images.Logo} className="img-fluid" alt="..." />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 py-3 credential-container">
            <div className="flex-center flex-column">
              <div className="card border-0">
                <h3 className="mb-4">Get Started!</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* E-mail */}
                  <div className="form-group mb-4">
                    {errors.email && errors.email.message ? (
                      <p className="text-danger">
                        {errors.email && errors.email.message}
                      </p>
                    ) : (
                      <p>E-mail</p>
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
                      className="form-control shadow-none"
                      placeholder="Enter e-mail"
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group mb-4">
                    {errors.password && errors.password.message ? (
                      <p className="text-danger">
                        {errors.password && errors.password.message}
                      </p>
                    ) : (
                      <p>Password</p>
                    )}

                    <input
                      type="password"
                      name="password"
                      {...register("password", {
                        required: "Please enter password",
                        minLength: {
                          value: 8,
                          message: "Minimun length 8 character",
                        },
                      })}
                      className="form-control shadow-none"
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="d-flex">
                    <div>
                      <Link to="/reset">Forgot password ?</Link>
                    </div>
                    <div className="ml-auto">
                      <button
                        type="submit"
                        className="btn shadow-none"
                        disabled={isLogging}
                      >
                        {isLogging ? (
                          <span>Logging in...</span>
                        ) : (
                          <span>Login</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
