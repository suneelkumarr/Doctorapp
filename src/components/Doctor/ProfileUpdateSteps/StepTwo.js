import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../utils/apiURL";

const StepTwo = ({ responsestep, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const newData = {
        college: data.college,
        passingYear: Date(data.passingYear),
        specialist: data.specialist,
        currentHospital: data.currentHospital,
      };
      const token = `token ${localStorage.getItem('token')}`

      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/update`,
        newData, {
          headers: {authorization: token}
        }
      );
      if (response.status === 200) {
        setLoading(false);
        responsestep(3);
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
          {/* College */}
          <div className="col-12 col-md-6 pr-md-2">
            <div className="form-group mb-4">
              {errors.college && errors.college.message ? (
                <p className="text-danger">
                  {errors.college && errors.college.message}
                </p>
              ) : (
                <p>College</p>
              )}

              <input
                type="text"
                name="college"
                {...register("college", { required: "Name is required" })}
                className="form-control shadow-none"
                placeholder="Enter college name"
              />
            </div>
          </div>

          {/* Passing year */}
          <div className="col-12 col-md-6 pl-md-2">
            <div className="form-group mb-4">
              {errors.passingYear && errors.passingYear.message ? (
                <p className="text-danger">
                  {errors.passingYear && errors.passingYear.message}
                </p>
              ) : (
                <p>Passing year</p>
              )}

              <input
                type="date"
                name="passingYear"
                {...register("passingYear", {
                  required: "Passing year is required",
                })}
                className="form-control shadow-none"
              />
            </div>
          </div>

          {/* specialist */}
          <div className="col-12 col-md-6 pr-md-2">
            <div className="form-group mb-4">
              {errors.specialist && errors.specialist.message ? (
                <p className="text-danger">
                  {errors.specialist && errors.specialist.message}
                </p>
              ) : (
                <p>Specialist</p>
              )}

              <input
                type="text"
                name="specialist"
                {...register("specialist", {
                  required: "Specialist is required",
                })}
                className="form-control shadow-none"
                placeholder="Specialist title"
              />
            </div>
          </div>

          {/* current Hospital */}
          <div className="col-12 col-md-6 pl-md-2">
            <div className="form-group mb-4">
              {errors.currentHospital && errors.currentHospital.message ? (
                <p className="text-danger">
                  {errors.currentHospital && errors.currentHospital.message}
                </p>
              ) : (
                <p>Current hospital</p>
              )}

              <input
                type="text"
                name="currentHospital"
                className="form-control shadow-none"
                {...register("currentHospital", {
                  required: "Current hospital is required",
                })}
                placeholder="Current hospital name"
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

export default StepTwo;
