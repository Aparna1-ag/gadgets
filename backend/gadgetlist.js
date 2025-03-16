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
    datePosted: String,
    color: String,
    originalPurchaseDate: String,
    currentCondition: String,
    gadgetFeatures: String,
    imgUrl: [String]
},


)

export const Gadget = mongoose.model('Gadget', gadgetSchema)