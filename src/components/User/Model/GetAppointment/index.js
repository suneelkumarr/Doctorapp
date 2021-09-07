import React, { useState, useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import Icon from 'react-icons-kit'
import { useForm } from 'react-hook-form'
import { ic_clear } from 'react-icons-kit/md'
import { apiURL } from '../../../../utils/apiURL'
import SuccessAppointment from '../Alert/SuccessAppointment/index'

const GetAppointment = ({ hidemodal, doctor }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [patient, setPatient] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [isShowForm, setShowForm] = useState(false)
    const [success, setSucess] = useState(false)
    const [header] = useState({
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })

    useEffect(() => {
        const storedPatient = localStorage.getItem('patient')
        const patient = JSON.parse(storedPatient)
        setPatient(patient)
        setTimeout(() => { setShowForm(true) }, 2000)
    }, [header])

    // Submit Appoinment
    const onSubmit = async (data) => {
        try {
            let appointmentData = data
            appointmentData.doctorId = doctor
            appointmentData.patientId = patient._id

            setLoading(true)
            const response = await axios.post(`${apiURL}/patient/appointment/request`, appointmentData, header)
            if (response.status === 201) {
                setLoading(false)
                setSucess(true)
            }

        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error.response)
            }
        }
    }

    // if success appoinment
    if (success) return (<SuccessAppointment />)

    return (
        <div className="appointment-modal">
            <div className="backdrop">
                <div className="custom-modal shadow">
                    {/* Header */}
                    <div className="custom-modal-header">
                        <div className="d-flex">
                            <div className="flex-fill text-right">
                                <h5 className="mb-0">Fill-Up the form</h5>
                            </div>
                            <div className="flex-fill text-right">
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

                    {/* Body */}
                    <div className="custom-modal-body">
                        {isShowForm ?
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">

                                    {/* Name */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-3">
                                            {errors.name && errors.name.message ? (
                                                <small className="text-danger">{errors.name && errors.name.message}</small>
                                            ) : <small>Name</small>
                                            }

                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={patient ? patient.name : null}
                                                {...register("name", { required: "Name is required" })}
                                                className="form-control shadow-none"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-3">
                                            {errors.phone && errors.phone.message ? (
                                                <small className="text-danger">{errors.phone && errors.phone.message}</small>
                                            ) : <small>Phone number</small>
                                            }

                                            <input
                                                type="text"
                                                name="phone"
                                                defaultValue={patient ? patient.phone : null}
                                                {...register("phone", { required: "Phone number is required",
                                                pattern: {
                                                    value: /^\(?([0-9]{3})\)?([0-9]{8})$/,
                                                    message: "Number isn't valid."
                                                } })}
                                                className="form-control shadow-none"
                                                placeholder="01xxxxxxxxx"
                                            />
                                        </div>
                                    </div>

                                    {/* Age */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-3">
                                            {errors.age && errors.age.message ? (
                                                <small className="text-danger">{errors.age && errors.age.message}</small>
                                            ) : <small>Age</small>
                                            }

                                            <input
                                                type="number"
                                                name="age"
                                                defaultValue={patient ? patient.age : null}
                                                {...register("age", { required: "Age is required" })}
                                                className="form-control shadow-none"
                                                placeholder="Enter age"
                                            />
                                        </div>
                                    </div>

                                    {/* Weight */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-3">
                                            {errors.weight && errors.weight.message ? (
                                                <small className="text-danger">{errors.weight && errors.weight.message}</small>
                                            ) : <small>Weight</small>
                                            }

                                            <input
                                                type="number"
                                                name="weight"
                                                defaultValue={patient ? patient.weight : null}
                                                {...register("weight", { required: "Weight is required" })}
                                                className="form-control shadow-none"
                                                placeholder="Enter weight (20, 50 KG)"
                                            />
                                        </div>
                                    </div>

                                    {/* Height */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-3">
                                            {errors.height && errors.height.message ? (
                                                <small className="text-danger">{errors.height && errors.height.message}</small>
                                            ) : <small>Height</small>
                                            }

                                            <input
                                                type="number"
                                                name="height"
                                                defaultValue={patient ? patient.height : null}
                                                {...register("height", { required: "Height is required" })}
                                                className="form-control shadow-none"
                                                placeholder="Enter height (5, 6 feet)"
                                            />
                                        </div>
                                    </div>

                                    {/* BP */}
                                    <div className="col-12 col-lg-6">
                                        <div className="form-group mb-3">
                                            {errors.bloodPressure && errors.bloodPressure.message ? (
                                                <small className="text-danger">{errors.bloodPressure && errors.bloodPressure.message}</small>
                                            ) : <small>Blood pressure</small>
                                            }

                                            <input
                                                type="text"
                                                name="bloodPressure"
                                                defaultValue={patient ? patient.bloodPressure : null}
                                                {...register("bloodPresssure", { required: "Blood pressure is required" })}
                                                className="form-control shadow-none"
                                                placeholder="Enter BP (50/60, 60/70)"
                                            />
                                        </div>
                                    </div>

                                    {/* Problem */}
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            {errors.problemShortInfo && errors.problemShortInfo.message ? (
                                                <small className="text-danger">{errors.problemShortInfo && errors.problemShortInfo.message}</small>
                                            ) : <small>Problem's short information</small>
                                            }

                                            <textarea
                                                type="text"
                                                name="problemShortInfo"
                                                {...register("problemShortInfo", { required: "Discuss the short problem is required" })}
                                                className="form-control shadow-none"
                                                placeholder="Discuss the short problem"
                                                rows="4"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 text-right">
                                        <button
                                            type="submit"
                                            className="btn shadow-none"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <span>Submitting...</span> : <span>Submit</span>}
                                        </button>
                                    </div>

                                </div>
                            </form>
                            :
                            <div className="info-loading">
                                <h4>Taking your information...</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Notification */}
            {/* {notification ?
                <ToastNotification
                    {...notificationData}
                />
                : null} */}
        </div>
    );
};

export default GetAppointment;