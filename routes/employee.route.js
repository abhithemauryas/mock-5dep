const express=require("express")
const employeeRoute=express.Router()
const{auth}=require("../middleware/auth.middleware")
const {verifyrole}=require("../middleware/verify.middleware")
const {employeeModel}=require("../models/employee.model")
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
require("dotenv").config()
employeeRoute.use(auth)



employeeRoute.post("/employees",verifyrole(["Admin"]),async(req,res)=>{
       const {FirstName,LastName,Email,Department,Salary}=req.body
       try {
         const employee= new employeeModel({FirstName,LastName,Email,Department,Salary})
         await employee.save()
         res.status(200).send({"msg":"Employee is added"})
       } catch (error) {
          res.status(400).send({error: error.message})
          console.log(error)
       }
})

employeeRoute.patch("/employees",verifyrole(["Admin"]),async(req,res)=>{
    const employeeId=req.params.id
    const UpdateEmployeeData=req.body
    try {
        const employee= await employeeModel.findByIdAndUpdate(employeeId,UpdateEmployeeData,{
            new :true
        })

        res.status(200).send({"msg":"Employee is edited"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})


employeeRoute.delete("/employees",verifyrole(["Admin"]),async(req,res)=>{
    const employeeId= req.params.id
    try {
        let data =await employeeModel.findByIdAndDelete(employeeId)
        res.status(200).send({"msg":"employee is deleted"})
    } catch (error) {
        res.status(400).send({error:error.message}) 
    }
})

employeeRoute.get("/employees",async(req,res)=>{
    let {FirstName,Department,sortBySalary}=req.query
    try {
        FirstName=new RegExp(FirstName,"i")
        Department=new RegExp(Department,"i")
        if(sortBySalary==="asc"){
          sortBySalary=1
        }else if(sortBySalary==="desc"){
            sortBySalary=-1
        }
        if(sortBySalary){
            data= await employeeModel.find({FirstName,Department}.sort({data:sortBySalary}))
        }else{
            data= await employeeModel.find({FirstName,Department})
        }
        res.status(200).send({"msg":"All employee data successfully fetched"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

module.exports={
    employeeRoute
}