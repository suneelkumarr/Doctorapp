
const Appointment = require('../../../models/Appointment')
const CheckId = require('../../middleware/CheckId')

// Appointment Requests
const AppointmentRequests = async (req, res, next) => {
    try {
        const { id } = req.params
        await CheckId(id)

        const results = await Appointment.find({ doctor: id, status: 'pending' }, { doctor: 0, createdAt: 0, updatedAt: 0 })
            .populate('patientId', '_id')
            .exec()
        if (!results.length)
            return res.status(404).json({
                status: false,
                message: 'Request not found'
            })

        res.status(200).json({
            status: true,
            requests: results
        })

    } catch (error) {
        if (error) next(error)
    }
}

// Already approved Appointments
const ApprovedAppointments = async (req, res, next) => {
    try {
        const { id } = req.params
        await CheckId(id)

        const results = await Appointment.find({ doctor: id, status: 'approved' }, { doctor: 0, createdAt: 0, updatedAt: 0 })
            .populate('patientId', '_id')
            .exec()
        if (!results.length)
            return res.status(404).json({
                status: false,
                message: 'Appointments not found'
            })

        res.status(200).json({
            status: true,
            results: results
        })

    } catch (error) {
        if (error) next(error)
    }
}


// Approve Appointment
const ApproveAppointment = async (req, res, next) => {
    try {
        const { appointmentId, day, startTime } = req.body
        await CheckId(appointmentId)

        const isApprove = await Appointment.findByIdAndUpdate(
            { _id: appointmentId },
            { $set: { schedule: { day: day, startTime: startTime }, status: 'approved' } },
            { new: true }
        ).exec()

        if (isApprove) {
            return res.status(201).json({
                status: true,
                message: "Appointment accepted"
            })
        }

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    AppointmentRequests,
    ApprovedAppointments,
    ApproveAppointment
}