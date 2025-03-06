import mongoose from "mongoose";

const {Schema} = mongoose

 const customerSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    dateCreated: {type: Date, default: Date.now()}


})


export const Customer = mongoose.model('Customer', customerSchema)

