const express= require("express")
require("dotenv").config()
const cors=require("cors")

const {connection}=require("./database/db")
const {userRoute}=require("./routes/user.route")
const {employeeRoute}=require("./routes/employee.route")

const app = express()
app.use(express.json())
app.use(cors())



app.use(userRoute)
app.use(employeeRoute)



app.listen(process.env.port,async()=>{
    try {
       await connection 
       console.log("Db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at the port ${process.env.port}`)
})