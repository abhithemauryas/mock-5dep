require("dotenv").config()
const {UserModel}=require("../models/user.model")

const jwt=require("jsonwebtoken")

const auth= async(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        try {
            console.log(token)
            let decodeToken= jwt.verify(token,process.env.Secret)
            req.body.usedID= decodeToken.usedID
            req.body.role=decodeToken.role
            next()
        } catch (error) {
            console.log(error)
            res.status(400).send({"msg":"error"})
        }
    }else{
        return res.status(400).send({"msg":"Please login First"})
    }
}
module.exports={
    auth
}