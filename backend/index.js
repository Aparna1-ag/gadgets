import express from "express";
import { connecttoDB } from "./db.js";
import mongoose from "mongoose";
import { Customer } from "./userlist.js";
import cors from "cors"
import { Gadget } from "./gadgetlist.js";



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

app.post('/allgadgets', async (req, res) => {
    const {gadgetName, brand, model, resalePrice, originalPrice, salerName, sellerEmail, sellerPhone, datePosted, color, originalPurchaseDate, currentCondition, gadgetFeatures} = req.body
    try {
        const myGadget = await Gadget.create({
            gadgetName: gadgetName, brand: brand, model: model, resalePrice: resalePrice, originalPrice: originalPrice, salerName: salerName, sellerEmail: sellerEmail, sellerPhone: sellerPhone, datePosted: datePosted, color: color, originalPurchaseDate: originalPurchaseDate, currentCondition: currentCondition, gadgetFeatures: gadgetFeatures
        })
        res.send("Gadget successfully created!" + myGadget)

        console.log("Gadget successfully created!" + myGadget)

    } catch (err) {
        console.log(err)
        res.status(500).send("Error creating gadget")
    }
})






app.get("/", (req, res) => {
    res.send("Hello Aparna")
})








app.listen(PORT, () => {
    console.log("App is listening on the port " +  PORT)
})