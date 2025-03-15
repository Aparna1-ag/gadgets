import mongoose from "mongoose";


const {Schema} = mongoose


 const gadgetSchema = new Schema({

    gadgetName: String,
    brand: String,
    model: String,
    resalePrice: Number,
    originalPrice: Number,
    salerName: String,
    sellerEmail: String,
    sellerPhone: String,
    datePosted: Date,
    color: String,
    originalPurchaseDate: Date,
    currentCondition: String,
    gadgetFeatures: String,
    imgUrl: [String]
},


)

export const Gadget = mongoose.model('Gadget', gadgetSchema)