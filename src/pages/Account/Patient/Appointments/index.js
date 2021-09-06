import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../../../../utils/apiURL";

const Index = () => {
  const history = useHistory();
  const id = localStorage.getItem("id");
  const [isLoading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  useEffect(() => {
    // Fetch Appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${apiURL}/patient/appointment/request/${id}/index`,
          header
        );
        if (response.status === 200) {
          setAppointments(response.data.appointments);
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          console.log(error.response);
        }
      }
    };

    fetchAppointments();
  }, [id, header]);

  // Open chat window
  const goChatPage = (doctorId, appointmentId) => {
    history.push(
      `/messages?reciver=${doctorId}&appointmentid=${appointmentId}&token=${localStorage.getItem(
        "token"
      )}`
    );
  };

  // data loading
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="appointments">
      <div className="container-fluid py-3 py-lg-0">
        <div className="row">
          <div className="col-12 pl-lg-0">
            <div className="card border-0 shadow">
              <div className="card-header p-4 bg-white">
                <h5 className="mb-0">Your appointments</h5>
              </div>
              <div className="card-body px-md-4">
                <table className="table table-sm table-borderless">
                  <thead>
                    <tr>
                      <td>SL</td>
                      <td>Doctor name</td>
                      <td>Date</td>
                      <td>Time</td>
                      <td className="text-center">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments &&
                      appointments.map((appointment, i) => (
                        <tr key={i}>
                          <td>
                            <p>{i + 1}</p>
                          </td>
                          <td>
                            <p>{appointment.doctor.name}</p>
                          </td>
                          <td>
                            <p>
                              {appointment.schedule.day
                                ? appointment.schedule.day
                                : "Not set"}
                            </p>
                          </td>
                          <td>
                            <p>
                              {appointment.schedule.startTime
                                ? appointment.schedule.startTime
                                : "Not set"}
                            </p>
                          </td>
                          <td className="text-center">
                            {appointment.status === "pending" ? (
                              <button
                                type="button"
                                className="btn shadow-none"
                                disabled={true}
                              >
                                Pending
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn shadow-none"
                                onClick={() =>
                                  goChatPage(
                                    appointment.doctor._id,
                                    appointment._id
                                  )
                                }
                              >
                                go council
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
