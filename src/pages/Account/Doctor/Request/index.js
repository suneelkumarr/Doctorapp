import React, { useEffect, useState, useCallback } from "react";
import "./style.scss";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";

import ManageScheduleModal from "../../../../components/Doctor/Model/ManageSchedule/index";
import DataLoader from "../../../../components/DataLoader/index";

const Index = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [patient, setPatient] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [id] = useState(localStorage.getItem("id"));
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  // get all appointments requests
  const getRequests = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiURL}/doctor/appointment/${id}/requests`,
        header
      );
      if (response.status === 200) {
        setRequests(response.data.requests);
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
    getRequests();
  }, [id, header, getRequests]);

  // Hide Modal
  const hideModal = () => setShow(false);

  // Handle modal
  const handleModal = (data) => {
    let patient = data.patient;
    patient.patientId = data.patientId._id;
    patient.appointmentId = data._id;
    setPatient(patient);
    setShow(true);
  };

  // Submit Appointment
  const submitAppointment = async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.put(
        `${apiURL}/doctor/appointment/approve`,
        data,
        header
      );
      if (response.status === 201) {
        getRequests();
        setSubmitting(false);
        hideModal();
      }
    } catch (error) {
      if (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div className="index">
      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="container-fluid p-0 py-2 py-lg-0">
          <div className="col-12 pl-lg-0 mb-3">
            <h4>Appointment Requests</h4>
          </div>

          <div className="col-12 pl-lg-0">
            {/* Requests */}
            {requests &&
              requests.map((request, i) => (
                <div className="d-flex request" key={i}>
                  <div className="pt-2">
                    <p>{request.patient.name}</p>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      className="btn shadow-sm"
                      onClick={() => handleModal(request)}
                    >
                      Manage schedule
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Appointment manage modal */}
      {show ? (
        <ManageScheduleModal
          show={show}
          patientinfo={patient}
          scheduledata={submitAppointment}
          submitted={isSubmitting}
          hidemodal={hideModal}
        />
      ) : null}
    </div>
  );
};

export default Index;
