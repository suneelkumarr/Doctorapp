const {Schema , model} = require("mongoose")

const appointmentSchema = new Schema({
    doctor:{
        type:Schema.Types.ObjectId,
        ref:'Doctor'
    },
    patientId:{
        type:Schema.Types.ObjectId,
        ref:'Patient'
    },
    patient:{
        name:{
            type:String,
            trim:true,
            required:true
        },
        phone:{
            type:String,
            trim:true,
            required:true
        },
        age:{
            type:String,
            trim:true,
            required:true
        },
        height:{
            type:String,
            trim:true,
            required:true
        },
        weight:{
            type:String,
            trim:true,
            required:true
        },
        bloodPressure: {
            type:String,
            trim:true,
            required:true
        },
        problemShortInfo:{
            type:String,
            trim:true,
            required:true
        }
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending" , "approved" , "expried"]
    },
    schedule:{
        day:{
            type:String,
            trim:true,
            default:null
        },
        startTime:{
            type:String,
            trim:true,
            default:null
        }
    }
},{
    timestamps:true
})


const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;