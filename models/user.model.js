const mongoose= require("mongoose")

const userSchema= mongoose.Schema({
    email: String,
    password: String,
    role:{
        type:String,
        enum:["User", "Admin"],

    },
})

const UserModel= mongoose.model("user",userSchema)

module.exports={
    UserModel
}






