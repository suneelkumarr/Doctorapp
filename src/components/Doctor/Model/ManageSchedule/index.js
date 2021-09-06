import React, { useState, useEffect } from "react";
import "./style.scss";
import Icon from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";

const formatedDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  today = mm + "-" + dd + "-" + yyyy;
  return today;
};

const ManageSchedule = ({
  show,
  hidemodal,
  patientinfo,
  scheduledata,
  submitted,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [appointDate, setAppointDate] = useState(formatedDate());
  const [appointTime, setAppointTime] = useState({ value: null, error: false });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // onChange date
  const onChangeDate = (data) => {
    let today = data;
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = mm + "-" + dd + "-" + yyyy;
    setAppointDate(today);
  };

  // onChange Time
  const onChangeTime = (data) => setAppointTime({ value: data, error: false });

  // Submit Scheduke
  const submitSchedule = () => {
    if (!appointTime.value) return setAppointTime({ value: null, error: true });

    const data = {
      day: appointDate,
      startTime: appointTime.value,
      appointmentId: patientinfo.appointmentId,
    };
    scheduledata(data);
  };

  if (show === true) {
    return (
      <div className="manage-schedule-modal">
        <div className="backdrop">
          <div className="custom-modal-dialog">
            <div className="card border-0 shadow">
              <div className="card-header bg-white p-3">
                <div className="d-flex">
                  <div>
                    <h4>Manage Schedule</h4>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      className="btn btn-light rounded-circle shadow-none"
                      onClick={hidemodal}
                    >
                      <Icon icon={ic_clear} size={25} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                {/* Loader */}
                {isLoading ? (
                  <div className="loader-section text-center py-5">
                    <h3 className="mb-0">Loading...</h3>
                  </div>
                ) : (
                  // Information data
                  <div className="row">
                    <div className="col-12 col-lg-7 patient-info-column">
                      <h6>Patient Information</h6>
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td style={{ width: 100 }}>
                              <p>Name:</p>
                            </td>
                            <td>
                              <p>{patientinfo.name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 100 }}>
                              <p>age:</p>
                            </td>
                            <td>
                              <p>{patientinfo.age} yrs</p>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 100 }}>
                              <p>weight:</p>
                            </td>
                            <td>
                              <p>{patientinfo.weight} kg</p>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 100 }}>
                              <p>height:</p>
                            </td>
                            <td>
                              <p>{patientinfo.height} feet</p>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 100 }}>
                              <p>BP:</p>
                            </td>
                            <td>
                              <p>{patientinfo.bloodPressure}</p>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: 100 }}>
                              <p>Problem:</p>
                            </td>
                            <td>
                              <p>{patientinfo.problemShortInfo}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-12 col-lg-5">
                      <h6>Set Schedule</h6>

                      {/* Date */}
                      <div className="p-lg-2">
                        <p>Appointment Date</p>
                        <Calendar
                          minDate={new Date()}
                          onChange={onChangeDate}
                        />
                      </div>

                      <div className="p-lg-2 mt-3 mt-lg-0">
                        {/* Time */}
                        {appointTime.error ? (
                          <p className="text-danger">Time is required*</p>
                        ) : (
                          <p>Appointment Time</p>
                        )}
                        <TimePicker
                          className={appointTime.error ? "danger-border" : ""}
                          format="hh:mm a"
                          onChange={onChangeTime}
                          value={appointTime.value}
                        />
                        <br />

                        {/* Submit button */}
                        <button
                          type="button"
                          className="btn shadow-none px-4"
                          onClick={submitSchedule}
                          disabled={submitted}
                        >
                          {submitted ? "Submitting..." : "Save Appointment"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ManageSchedule;
