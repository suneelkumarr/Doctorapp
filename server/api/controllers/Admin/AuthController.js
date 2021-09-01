const Admin = require('../../../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Index of admin
const Index = async (req, res, next) => {
    try {
        const results = await Admin.find({}, { name: 1, email: 1, image: 1, role: 1, status: 1 }).exec()
        if (!results.length)
            return res.status(404).json({ status: false, message: 'Admin not found' })

        res.status(200).json({
            status: true,
            admins: results
        })
    } catch (error) {
        if (error) next(error)
    }
}

// Create New Admin
const Store = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body

        // Find exist admin
        const existAdmin = await Admin.findOne({ email: email }).exec()
        if (existAdmin) return res.status(409).json({ status: false, message: 'Admin already created.' })

        // Password Hash
        const hashPassword = await bcrypt.hash(password, 10)

        // Create account object
        const newAdmin = new Admin({
            name: name,
            email: email,
            role: role,
            password: hashPassword
        })

        // Save admin
        const saveAdmin = await newAdmin.save()
        if (saveAdmin)
            return res.status(201).json({
                status: true,
                message: "Successfully account created"
            })

    } catch (error) {
        if (error) next(error)
    }
}

// Login to account
const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Account find using email 
        let account = await Admin.findOne({ email }).exec()

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
                const updateToken = await Admin.findOneAndUpdate({ _id: account._id },
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

        // Find account using account id and role
        let account = await Admin.findOne({
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
        const updateToken = await Admin.findByIdAndUpdate({ _id: decode.id }, { $set: { 'access_token': null, 'status': 'offline' } })
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
    Index,
    Store,
    Login,
    Logout
}