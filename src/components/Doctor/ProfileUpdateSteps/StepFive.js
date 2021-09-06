import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../utils/apiURL";

const StepFive = ({ responsestep, id }) => {
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
        responsestep(5);
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
      <div className="mb-4">
        <h6>Council hour</h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-2">
          <div className="col-12 col-lg-4">
            {errors.day && errors.day.message ? (
              <p className="text-danger">{errors.day && errors.day.message}</p>
            ) : (
              <p>Day</p>
            )}
            <select
              name="day"
              {...register("day", {
                required: "Day is required",
              })}
              className="form-control shadow-none"
            >
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>

          <div className="col-12 col-lg-4">
            {errors.startTime && errors.startTime.message ? (
              <p className="text-danger">
                {errors.startTime && errors.startTime.message}
              </p>
            ) : (
              <p>Start time</p>
            )}
            <input
              type="time"
              name="startTime"
              {...register("startTime", {
                required: "Start time is required",
              })}
              className="form-control shadow-none"
            />
          </div>

          <div className="col-12 col-lg-4">
            {errors.endTime && errors.endTime.message ? (
              <p className="text-danger">
                {errors.endTime && errors.endTime.message}
              </p>
            ) : (
              <p>End time</p>
            )}
            <input
              type="time"
              name="endTime"
              {...register("endTime", {
                required: "End time is required",
              })}
              className="form-control shadow-none"
            />
          </div>

          <div className="col-12 text-right mt-3">
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

export default StepFive;
