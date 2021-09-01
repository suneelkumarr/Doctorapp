const {Schema, model} = require('mongoose')

const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const patientSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxlength:50,
        default:null
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:[validateEmail,'Please provide a valid email address']
    },
    role:{
        type:String,
        dafault:"patient",
        enum:["patient"]
    },
    status:{
        type:String,
        default:"offline",
        enum:["online", "offline"]
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:String,
        trim:true,
        default:null
    },
    age:{
        type:Number,
        trim:true,
        dafault:null
    },
    height:{
        type:String,
        trim:true,
        default:null
    },
    weight:{
        type:String,
        trim:true,
        default:null
    },
    bloodPressure:{
        type:String,
        trim:true,
        deafult:true
    },
    appointmentRequests:[{
        type:Schema.Types.ObjectId,
        ref:'Appointment'
    }],
    access_token:{
        type:String,
        trim:true,
        default:null
    }
},{
    timestamps:true
})


const Patient = model('Patient' , patientSchema);
module.exports= Patient;