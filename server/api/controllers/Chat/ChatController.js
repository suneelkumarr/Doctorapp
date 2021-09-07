const Appointment = require('../../../models/Appointment')
const CheckId = require('../../middleware/CheckId')

// Check Appointment Status 
const CheckAppointmentStatus = async (req, res, next) => {
    try {
        let response = {}
        const { id } = req.params
        CheckId(id)

        const result = await Appointment.findById(id, { status: 1, _id: 0 }).exec()
        result.status === 'approved' ? response.status = true : response.status = false
        res.status(200).json(response)

    } catch (error) {
        if (error) next(error)
    }
}


module.exports = {
    CheckAppointmentStatus
}