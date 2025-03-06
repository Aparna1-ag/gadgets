import mongoose from "mongoose";


const {Schema} = mongoose


export const gadgetSchema = new Schema({

name: {type: String, required: true},
price: {type: String, required: true},
dateSold: {type: Date, required: true},
customerId: {type: String, required: true},
brand: {type: String, required: true},
colour: {type: String, required: true},


})