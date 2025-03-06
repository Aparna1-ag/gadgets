import express from "express";
import { connecttoDB } from "./db.js";
import mongoose from "mongoose";
import { Customer } from "./userlist.js";
import cors from "cors"

const {Schema} = mongoose


const app = express()



const PORT = 3300

app.use(express.json())

connecttoDB()


app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))







app.post("/createuser", async (req, res) => {

    const {name, age, email, password, date} = req.body
    
    try {
         const newUser = await Customer.create({
            name: name,
            age : age,
            email : email,
            password : password,
            dateCreated: date
         })

        res.send("New User Created" + newUser)
        console.log("new user created" + newUser)
    } catch (err)  {
        console.log("Error inserting user:", err);  
        res.status(500).send("Error creating user");
    }

   
})







app.get("/", (req, res) => {
    res.send("Hello Aparna")
})








app.listen(PORT, () => {
    console.log("App is listening on the port " +  PORT)
})