import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";

import DataLoader from "../../../../components/DataLoader/index";

const Index = () => {
  const [isLoading, setLoading] = useState(true);
  const [option, setOption] = useState("All Pending");
  const [appointments, setAppointments] = useState([]);
  const [id] = useState(localStorage.getItem("id"));
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  // get all appointments requests
  const getApprovedAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiURL}/doctor/appointment/${id}/approved`,
        header
      );
      if (response.status === 200) {
        setAppointments(response.data.results);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  }, [id, header]);

  useEffect(() => {
    getApprovedAppointments();
  }, [id, header, getApprovedAppointments]);

  // onChange Appointment
  const onChangeAppointment = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="index">
      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="container-fluid p-0 py-2 py-lg-0">
          <div className="col-12 pl-lg-0 mb-3">
            <div className="card border-0 shadow">
              <div className="card-body p-3">
                <div className="d-flex">
                  <div>
                    <h5>{option}</h5>
                  </div>
                  <div className="ml-auto">
                    <select
                      className="form-control shadow-none"
                      onChange={onChangeAppointment}
                    >
                      <option>All Pending</option>
                      <option>Today Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 pl-lg-0">
            {/* Appointments */}
            {appointments &&
              appointments.map((appointment, i) => (
                <div className="d-flex appointment" key={i}>
                  <div>
                    <p>{appointment.patient.name}</p>
                    <div>
                      <small>Phone: {appointment.patient.phone}</small>
                    </div>
                    <small>
                      Date: {appointment.schedule.day} || Time:{" "}
                      {appointment.schedule.startTime}
                    </small>
                  </div>
                  <div className="ml-auto">
                    <button type="button" className="btn shadow-sm">
                      Take Council
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
