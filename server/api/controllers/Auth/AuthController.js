const Doctor = require('../../../models/Doctor')
const Patient = require('../../../models/Patient')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Register Account
const Register = async (req, res, next) => {
    try {
        const { email, role, password } = req.body

        // Doctor Check
        if (role === "doctor") {
            const check = await Doctor.findOne({ email: email }).exec()

            if (check)
                return res.status(208).json({
                    status: false,
                    message: 'This email already used.'
                })

            // Password Hash
            const hashPassword = await bcrypt.hash(password, 10)

            // Create account object
            const newAccount = new Doctor({
                email: email,
                role: role,
                password: hashPassword
            })

            // Save information
            const saveAccount = await newAccount.save()
            if (saveAccount)
                return res.status(201).json({
                    status: true,
                    message: "Successfully account created"
                })
        }

        // Patient Check
        if (role === "patient") {
            const check = await Patient.findOne({ email: email }).exec()

            if (check)
                return res.status(208).json({
                    status: false,
                    message: 'This email already used.'
                })

            // Password Hash
            let hashPassword = await bcrypt.hash(password, 10)

            // Create account object
            let newAccount = new Patient({
                email: email,
                role: role,
                password: hashPassword
            })

            // Save information
            const saveAccount = await newAccount.save()
            if (saveAccount)
                return res.status(201).json({
                    status: true,
                    message: "Successfully account created"
                })
        }

    } catch (error) {
        if (error) next(error)
    }
}

// Login Account
const Login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body

        // Doctor Check
        if (role === "doctor") {
            // Account find using email 
            let account = await Doctor.findOne({ email }).exec()

            // Compare with password
            if (account) {
                const result = await bcrypt.compare(password, account.password)
                if (result) {

                    // Generate JWT token
                    const token = await jwt.sign(
                        { id: account._id, name: account.name, role: account.role },
                        'SECRET', { expiresIn: '1d' }
                    )

                    // Update JWT token 
                    const updateToken = await Doctor.findOneAndUpdate({ _id: account._id },
                        { $set: { 'access_token': token, 'status': 'online' } },
                        { new: true }).exec()

                    if (updateToken) {
                        return res.status(200).json({
                            status: true,
                            token
                        })
                    }
                    return res.status(404).json({
                        status: false,
                        message: 'Invalid e-mail or password'
                    })

                }
                return res.status(404).json({
                    status: false,
                    message: 'Invalid e-mail or password'
                })
            }
        }

        // Patient Check
        if (role === "patient") {
            // Account find using email 
            let account = await Patient.findOne({ email }).exec()

            // Compare with password
            if (account) {
                const result = await bcrypt.compare(password, account.password)
                if (result) {

                    // Generate JWT token
                    const token = await jwt.sign(
                        { id: account._id, name: account.name, role: account.role },
                        'SECRET', { expiresIn: '1d' }
                    )

                    // Update JWT token 
                    const updateToken = await Patient.findOneAndUpdate({ _id: account._id },
                        { $set: { 'access_token': token, 'status': 'online' } },
                        { new: true }).exec()

                    if (updateToken) {
                        return res.status(200).json({
                            status: true,
                            token
                        })
                    }
                    return res.status(404).json({
                        status: false,
                        message: 'Invalid e-mail or password'
                    })
                }
                return res.status(404).json({
                    status: false,
                    message: 'Invalid e-mail or password'
                })
            }
        }

        res.status(404).json({
            status: false,
            message: 'Invalid e-mail or password'
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Reset Password
const Reset = async (req, res, next) => {
    try {
        const { email } = req.body

        console.log({ email, password })
    } catch (error) {
        if (error) next(error)
    }
}

// Logout
const Logout = async (req, res, next) => {
    try {
        // Split token
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET')

        // Doctor Logout
        if (decode.role === "doctor") {
            // Find account using account id and role
            let account = await Doctor.findOne({
                $and: [
                    { _id: decode.id },
                    { role: decode.role }
                ]
            })
            if (!account) {
                return res.status(404).json({
                    status: false,
                    message: 'Invalid token'
                })
            }

            // Find account and null token field 
            const updateToken = await Doctor.findByIdAndUpdate({ _id: decode.id }, { $set: { 'access_token': null, 'status': 'offline' } })
            if (!updateToken) {
                return res.status(404).json({
                    status: false,
                    message: 'Invalid token'
                })
            }

            res.status(200).json({
                status: true,
                message: 'Successfully logged out'
            })
        }

        // Patient Logout
        if (decode.role === "patient") {
            // Find account using account id and role
            let account = await Patient.findOne({
                $and: [
                    { _id: decode.id },
                    { role: decode.role }
                ]
            })
            if (!account) {
                return res.status(404).json({
                    status: false,
                    message: 'Invalid token'
                })
            }

            // Find account and null token field 
            const updateToken = await Patient.findByIdAndUpdate({ _id: decode.id }, { $set: { 'access_token': null, 'status': 'offline' } })
            if (!updateToken) {
                return res.status(404).json({
                    status: false,
                    message: 'Invalid token'
                })
            }

            res.status(200).json({
                status: true,
                message: 'Successfully logged out'
            })
        }

    } catch (error) {
        if (error) {
            res.status(501).json({
                status: false,
                message: error.message
            })
        }
    }
}



module.exports = {
    Register,
    Login,
    Reset,
    Logout
}