import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../utils/apiURL";

const StepThree = ({ responsestep, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const token = `token ${localStorage.getItem('token')}`
      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/update`,
        data, {
          headers: {authorization: token}
        }
      );
      if (response.status === 200) {
        setLoading(false);
        responsestep(4);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };

  return (
    <div className="step">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* country */}
          <div className="col-12 col-md-6 pr-md-2">
            <div className="form-group mb-4">
              {errors.country && errors.country.message ? (
                <p className="text-danger">
                  {errors.country && errors.country.message}
                </p>
              ) : (
                <p>Country</p>
              )}

              <input
                type="text"
                name="country"
                {...register("country", { required: "Country is required" })}
                className="form-control shadow-none"
                placeholder="Enter country name"
              />
            </div>
          </div>

          {/* city */}
          <div className="col-12 col-md-6 pl-md-2">
            <div className="form-group mb-4">
              {errors.city && errors.city.message ? (
                <p className="text-danger">
                  {errors.city && errors.city.message}
                </p>
              ) : (
                <p>City</p>
              )}

              <input
                type="text"
                name="city"
                {...register("city", { required: "City is required" })}
                className="form-control shadow-none"
                placeholder="Enter city name"
              />
            </div>
          </div>

          {/* Current Address */}
          <div className="col-12">
            <div className="form-group mb-4">
              {errors.currentAddress && errors.currentAddress.message ? (
                <p className="text-danger">
                  {errors.currentAddress && errors.currentAddress.message}
                </p>
              ) : (
                <p>Current address</p>
              )}

              <input
                type="text"
                name="currentAddress"
                {...register("currentAddress", {
                  required: "Current address is required",
                })}
                className="form-control shadow-none"
                placeholder="Enter current address"
              />
            </div>
          </div>

          <div className="col-12 text-right">
            <button
              type="submit"
              className="btn shadow-none"
              disabled={isLoading}
            >
              {isLoading ? <span>Please Wait...</span> : <span>Next</span>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepThree;
