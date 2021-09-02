const { Schema , model}  = require("mongoose")

const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const adminSchma = new Schema({
    name:{
        type:String,
        trim:true,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validateEmail,"Please provide a valid email address"]
    },
    role:{
        type:String,
        default:"super_admin",
        enum:["super_admin","admin", "manager"]
    },
    status:{
        type:String,
        default:"offline",
        enum:["online","offline"]
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
    access_token :{
        type:String,
        trim:true,
        default:null
    }
}, {
    timestamps:true
})

const Admin = model('Admin' , adminSchma);

module.exports = Admin;