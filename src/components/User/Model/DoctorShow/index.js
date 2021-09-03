import React, { useState } from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import jwt_decode from 'jwt-decode'
import { ic_clear } from 'react-icons-kit/md'
import AppointmentModal from '../GetAppointment/index'
import AlertModal from '../Alert/AuthCheck/index'

const Index = ({ show, doctor }) => {
    const token = localStorage.getItem('token')
    const [isAuth, setAuth] = useState({ message: null, status: false })
    const [showAppointment, setShowAppointment] = useState({
        status: false,
        doctorId: null
    })

    // Role check
    const checkRole = (token) => {
        const decode = jwt_decode(token)
        const role = decode.role
        if (role === 'patient') return true
        return false
    }

    // Handle appointment
    const handleAppointment = () => {
        if (token) {
            const patient = checkRole(token)
            if (patient) {
                setShowAppointment({ status: true, doctorId: doctor._id })
            } else {
                setAuth({ message: 'You are not patient, please create a patient account to get all services. Thank you', status: true })
            }
        } else {
            setAuth({ message: 'Please logged in first to access all services. Thank you', status: true })
        }
    }

    // Check Patient auth
    if (isAuth.status) {
        return (<AlertModal message={isAuth.message} hide={() => setAuth({ message: null, status: false })} />)
    }

    return (
        <div className="doctor-show shadow">
            <div className="info-container p-3">
                <div className="header">
                    <button
                        type="button"
                        className="btn btn-light p-1 shadow-none rounded-circle"
                        onClick={show}
                    >
                        <Icon icon={ic_clear} size={30} />
                    </button>
                </div>

                {/* Body */}
                <div className="body pt-3">
                    {/* Basic Info */}
                    <div className="text-center">
                        <div className="img-box rounded-circle">
                            <img src={doctor.image} className="img-fluid" alt="..." />
                        </div>
                        <br />
                        <h5 className="mb-0 text-capitalize">{doctor.name}</h5>
                        <p className="text-capitalize mb-0">{doctor.specialist} Specialist</p>
                        <p className="text-capitalize">{doctor.college}</p>
                        {/* <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} />
                        <Icon icon={ic_star} size={20} /> */}
                    </div>
                    {/* Current Hospital */}
                    <div className="mt-3">
                        <h6 className="mb-0">Current Hospital</h6>
                        <p>{doctor.currentHospital}l</p>
                    </div>
                    {/* Schedule */}
                    <div className="mt-3">
                        <h6 className="mb-2">Councilling Schedule</h6>
                        <table className="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Start time</th>
                                    <th>End time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctor.councilHour && doctor.councilHour.map((item, i) =>
                                    <tr key={i}>
                                        <th>{item.schedule.day}</th>
                                        <th>{item.schedule.startTime}</th>
                                        <th>{item.schedule.endTime}</th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ////////////////// Council Fee goes to here /////////////////// */}
                    {/* <div className="mt-3">
                        <h6 className="mb-0">Councilling Fee</h6>
                        <p>100 tk.</p>
                    </div> */}

                    <div className="my-3 text-center">
                        <button
                            type="button"
                            className="btn shadow-none"
                            onClick={handleAppointment}
                        >Get Appointment</button>
                    </div>
                </div>
            </div>

            {/* Appointment Modal */}
            {showAppointment.status ?
                <AppointmentModal
                    doctor={showAppointment.doctorId}
                    hidemodal={() => setShowAppointment({ status: false, doctorId: null })}
                /> : null}
        </div>
    );
};

export default Index;