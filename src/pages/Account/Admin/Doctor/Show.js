import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { apiURL } from "../../../../utils/apiURL";
import PreLoading from "../../../../components/Admin/Loader/index";

const Show = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isUpdate, setUpdate] = useState(false);

  // Fetch doctor
  const fetchDoctor = useCallback(async () => {
    try {
      const response = await axios.get(`${apiURL}/admin/doctor/${id}/show`);
      if (response.status === 200) {
        setDoctor(response.data.doctor);
        setLoading(false);
      }
    } catch (error) {
      if (error) console.log(error.response);
    }
  }, [id]);

  useEffect(() => {
    fetchDoctor();
  }, [id, fetchDoctor]);

  // Update account status
  const approveAccount = async (id) => {
    try {
      setUpdate(true);
      const response = await axios.put(
        `${apiURL}/admin/doctor/${id}/account/update/${"approved"}`
      );
      if (response.status === 201) {
        fetchDoctor();
        setUpdate(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error) console.log(error.response);
    }
  };

  // if API fetch loading
  if (isLoading) return <PreLoading />;

  return (
    <div className="admin-doctor-show">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-padding">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <div className="d-lg-flex pb-4">
                  <div className="text-center">
                    <div className="img-container rounded-circle">
                      <img src={doctor.image} className="img-fluid" alt="..." />
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="basic-info pl-lg-5 pt-4 pt-lg-0">
                    <h5 className="mb-0">{doctor.name}</h5>
                    <p>{doctor.specialist} specialist</p>
                    <p>{doctor.currentHospital}</p>

                    <div className="text-right text-lg-left">
                      {doctor.isApproved === "submitted" ? (
                        <button
                          type="button"
                          className="btn shadow-none"
                          disabled={isUpdate}
                          onClick={() => approveAccount(doctor._id)}
                        >
                          {isUpdate ? "Please wait" : "Approve"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

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

                {/* Education info */}
                <div className="education-info pb-4">
                  <h5 className="mb-0">Education</h5>
                  <hr className="my-1" />
                  {doctor.college &&
                  doctor.passingYear &&
                  doctor.specialist &&
                  doctor.currentHospital ? (
                    <div>
                      <p>College: {doctor.college}</p>
                      <p>Passing Year: {doctor.passingYear}</p>
                      <p>Specialist: {doctor.specialist}</p>
                      <p>Working: {doctor.currentHospital}</p>
                    </div>
                  ) : null}
                </div>

                {/* Contact info */}
                <div className="contact-info pb-4">
                  <h5 className="mb-0">Contact</h5>
                  <hr className="my-1" />
                  {doctor.location ? (
                    <div>
                      <p>
                        Email:{" "}
                        <span className="text-lowercase">{doctor.email}</span>
                      </p>
                      <p>
                        Country:{" "}
                        {doctor.location
                          ? doctor.location.address.country
                          : null}
                      </p>
                      <p>
                        City:{" "}
                        {doctor.location ? doctor.location.address.city : null}
                      </p>
                      <p>
                        Current address:{" "}
                        {doctor.location
                          ? doctor.location.address.currentAddress
                          : null}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Council hour */}
                <div className="council-hour pb-4">
                  <h5 className="mb-0">Council hour</h5>
                  <hr className="my-1" />
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <td className="text-center">SL</td>
                        <td>Day</td>
                        <td>Start time</td>
                        <td>End time</td>
                      </tr>
                    </thead>
                    <tbody>
                      {doctor.councilHour &&
                        doctor.councilHour.map((item, i) => (
                          <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td className="text-capitalize">
                              {item.schedule.day}
                            </td>
                            <td>{item.schedule.startTime}</td>
                            <td>{item.schedule.endTime}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* <h4>{doctor.name}</h4> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
