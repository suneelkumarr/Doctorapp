const Doctor = require('../../../models/Doctor')
const Patient = require('../../../models/Patient')
const Appointment = require('../../../models/Appointment')
const checkId = require('../../middleware/CheckId')

// Get Appointment Requests
const GetAppointmentRequests = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id)
            return res.status(422).json({
                status: false,
                message: 'Patient ID not found'
            })

        await checkId(id)
        const results = await Appointment.find({ patientId: id }, { schedule: 1, status: 1 })
            .populate('doctor', 'name')
            .exec()

        // IF results not found
        if (!results.length) {
            return res.status(404).json({
                status: false,
                message: 'Appointments not found'
            })
        }

        res.status(200).json({
            status: true,
            appointments: results
        })

    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

// Set Appointment Request
const SetAppointmentRequest = async (req, res, next) => {
    try {
        const {
            doctorId,
            patientId,
            name,
            phone,
            age,
            height,
            weight,
            bloodPressure,
            problemShortInfo
        } = req.body

        const newAppointment = new Appointment({
            doctor: doctorId,
            patientId,
            patient: { name, phone, age, height, weight, bloodPressure, problemShortInfo }
        })

        // Create appoinment
        const createAppointment = await newAppointment.save()
        // Update doctor
        const updateDoctor = await Doctor.findOneAndUpdate(
            { _id: doctorId },
            { $push: { 'appointments': [createAppointment._id] } },
            { new: true }
        ).exec()

        // Update Patient
        const updatePatient = await Patient.findOneAndUpdate(
            { _id: patientId },
            { $push: { 'appointmentRequests': [createAppointment._id] } },
            { new: true }
        ).exec()

        if (createAppointment && updateDoctor && updatePatient)
            return res.status(201).json({
                status: true,
                message: 'Your appointment request has been sent.'
            })

    } catch (error) {
        if (error) {
            next(error)
        }
    }
}

module.exports = {
    GetAppointmentRequests,
    SetAppointmentRequest
}