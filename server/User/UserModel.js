const { default: mongoose } = require("mongoose");

class UserModel{
    constructor(){
        this.schema = new mongoose.Schema({
            firstName:{type:String, required:true},
            lastName:{type:String, required:true},
            email:{type:String, required:true, unique:true},
            phone:{type:String, default:null},
            password:{type:String, required:true},
            isAdmin:{type:String, default:false}
        },{
            timeseries:true
        })
    }
}
const User = new UserModel()
const userModel = mongoose.model("tbl_users", User.schema)
module.exports = userModel
