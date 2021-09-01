const Doctors = require('../../../models/Doctors')

const findNearestDoctors = async (req, res, next) => {
    const { lng, lat } = req.body
    try {
        const doctors = await Doctors.find(
            {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        maxDistance: 10000,
                        distanceField: 'distance'
                    }
                }
            })
        console.log("res", doctors);

        res.send(doctors)

    } catch (error) {
        if (error) {
            console.log(error.message)
            next(error)
        }
    }
}



module.exports = {
    findNearestDoctors
}