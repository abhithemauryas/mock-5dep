
const express=require("express")
const userRoute=express.Router()

const{auth}=require("../middleware/auth.middleware")

const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
require("dotenv").config()


userRoute.post("/signup",async(req,res)=>{
  let {email,password,role}=req.body
  try {
    let user =await UserModel.findOne({email})
    if(user){
        return res.send(409).send({"Success": false,"error":"already exits please login"})
    }
    const hash= bcrypt.hashSync(password,6)
    let newUser= new UserModel({email,password: hash,role})
    console.log(newUser)
    await newUser.save()
    res.status(200).send({"msg":"User registraction successfully"})
  } catch (error) {
    res.status(400).send({"error": error.message})
  }
})

userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body
     try {
        const user= await UserModel.findOne({email})
        if(!user){
            return res.status(401).send({"msg":"Invalid Email"})

        }
        bcrypt.compare(password,user.password, function(err,result){
            if(err){
                return res.status(500).send({"msg":"An error occuring during password compairison."})
            }
            if(result){
                const token=jwt.sign({userID: user-__dirname,role: user.role},process.env.Secret,{expiresIn:'7d'})
                return res.status(200).send({"msg":"Login successul", token:token})
            }else{
                return res.status(401).send({"msg":"Invalid Password"})
            }
        })
     } catch (error) {
        return res.status(500).send({"msg":"An error occurred while processing the request"})
     }
})
userRoute.post("/logout",auth,async(req,res)=>{
        let token= req.headers.token;
        try {
            const blacklistToken= new BlacklistModel({token})
            await blacklistToken.save()
            return res.status(200).send({"msg":"Log out Successful"})
        } catch (error) {
            res.status(400).send({"error": error.message})    
        }      
})

module.exports={
    userRoute
}

