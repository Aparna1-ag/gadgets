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
    const {gadgetName, brand, model, resalePrice, originalPrice, salerName, sellerEmail, sellerPhone, datePosted, color, originalPurchaseDate, currentCondition, gadgetFeatures, imgUrl} = req.body
    try {
        const myGadget = await Gadget.create({
            gadgetName: gadgetName, brand: brand, model: model, resalePrice: resalePrice, originalPrice: originalPrice, salerName: salerName, sellerEmail: sellerEmail, sellerPhone: sellerPhone, datePosted: datePosted, color: color, originalPurchaseDate: originalPurchaseDate, currentCondition: currentCondition, gadgetFeatures: gadgetFeatures, imgUrl: imgUrl
        })
        res.status(200).send({success: true, message: `Your gadget ${brand} - ${model} has been posted successfully!`})

        console.log("Gadget successfully created!" + myGadget)

    } catch (err) {
        console.log(err)
        res.status(500).send("Error creating gadget")
    }
})


app.get('/allgadgets', async (req, res) => {
   try {
    const myDbData = await Gadget.find()
    res.json(myDbData)
   } catch (err) {
    res.status(500).json({message : "Error fetching collection"})
   }
})



//  const gadgetDataaa = [
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056291/s7rathrocmr1j6bzjan1.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056292/hlrqmd9n5rqihefw9nfv.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056294/hlq9pxl6gdoblgpublc3.png"
//           ],
//         "gadgetName": "Smartphone",
//         "brand": "Apple",
//         "model": "iPhone 13 Pro",
//         "resalePrice": "750",
//         "originalPrice": "999",
//         "salerName": "John Doe",
//         "sellerEmail": "johndoe@example.com",
//         "sellerPhone": "+1-234-567-8901",
//         "datePosted": "2025-03-09",
//         "color": "Graphite",
//         "originalPurchaseDate": "2023-12-15",
//         "currentCondition": "Excellent - No scratches, fully functional",
//         "gadgetFeatures": [
//             "6.1-inch Super Retina XDR display",
//             "A15 Bionic chip for lightning-fast performance",
//             "Triple-camera system with LiDAR scanner",
//             "5G enabled for ultra-fast connectivity",
//             "Ceramic Shield for improved durability",
//             "ProMotion technology with 120Hz refresh rate"
//         ].join(", ")
//     },
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056220/etv6n3ibihkky0skapgr.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056222/g0btihbcurg3bwgmcako.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056230/bcawhepifoyjztvdktko.png"
//           ],
//         "gadgetName": "Laptop",
//         "brand": "Dell",
//         "model": "XPS 13",
//         "resalePrice": "950",
//         "originalPrice": "1200",
//         "salerName": "Alice Smith",
//         "sellerEmail": "alicesmith@example.com",
//         "sellerPhone": "+1-345-678-9012",
//         "datePosted": "2025-03-08",
//         "color": "Silver",
//         "originalPurchaseDate": "2023-11-20",
//         "currentCondition": "Very Good - Minor wear, fully functional",
//         "gadgetFeatures": [
//             "13.4-inch InfinityEdge 4K UHD+ display",
//             "Intel Core i7 11th Gen processor",
//             "16GB RAM and 512GB SSD storage",
//             "Ultra-thin and lightweight design",
//             "Long battery life up to 14 hours",
//             "Backlit keyboard with fingerprint reader"
//         ].join(", ")
//     },
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742049897/foppys97ldnrienaqcgb.jpg",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742049898/ngrax1r4dwbracd4zvpj.jpg",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742049899/hqxshqokdiqwiyaa9bur.jpg"
//           ],
//         "gadgetName": "Tablet",
//         "brand": "Samsung",
//         "model": "Galaxy Tab S7",
//         "resalePrice": "400",
//         "originalPrice": "650",
//         "salerName": "Michael Brown",
//         "sellerEmail": "michaelbrown@example.com",
//         "sellerPhone": "+1-456-789-0123",
//         "datePosted": "2025-03-07",
//         "color": "Mystic Black",
//         "originalPurchaseDate": "2023-09-10",
//         "currentCondition": "Good - Some scratches, works perfectly",
//         "gadgetFeatures": [
//             "11-inch LTPS TFT display with 120Hz refresh rate",
//             "Qualcomm Snapdragon 865+ processor",
//             "S Pen included with ultra-low latency",
//             "Quad speakers tuned by AKG with Dolby Atmos",
//             "Supports DeX mode for a PC-like experience",
//             "Large 8000mAh battery with fast charging"
//         ].join(", ")
//     },
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056291/s7rathrocmr1j6bzjan1.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056292/hlrqmd9n5rqihefw9nfv.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056294/hlq9pxl6gdoblgpublc3.png"
//           ],
//         "gadgetName": "Smartwatch",
//         "brand": "Garmin",
//         "model": "Fenix 6",
//         "resalePrice": "350",
//         "originalPrice": "600",
//         "salerName": "Emma Wilson",
//         "sellerEmail": "emmawilson@example.com",
//         "sellerPhone": "+1-567-890-1234",
//         "datePosted": "2025-03-06",
//         "color": "Titanium",
//         "originalPurchaseDate": "2023-08-25",
//         "currentCondition": "Like New - Barely used",
//         "gadgetFeatures": [
//             "1.3-inch always-on display with scratch-resistant glass",
//             "Advanced GPS and heart rate monitoring",
//             "Preloaded sports apps and performance metrics",
//             "Water-resistant up to 100 meters",
//             "Up to 14 days of battery life in smartwatch mode",
//             "Music storage and Garmin Pay support"
//         ].join(", ")
//     },
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056220/etv6n3ibihkky0skapgr.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056222/g0btihbcurg3bwgmcako.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056230/bcawhepifoyjztvdktko.png"
//           ],
//         "gadgetName": "Headphones",
//         "brand": "Sony",
//         "model": "WH-1000XM4",
//         "resalePrice": "200",
//         "originalPrice": "350",
//         "salerName": "David Johnson",
//         "sellerEmail": "davidjohnson@example.com",
//         "sellerPhone": "+1-678-901-2345",
//         "datePosted": "2025-03-05",
//         "color": "Black",
//         "originalPurchaseDate": "2023-10-05",
//         "currentCondition": "Fair - Visible wear, works well",
//         "gadgetFeatures": [
//             "Industry-leading noise cancellation technology",
//             "Up to 30 hours of battery life",
//             "Touch controls for volume and playback",
//             "Multipoint connection for easy switching",
//             "Adaptive sound control based on activity",
//             "Quick charge: 10 minutes for 5 hours playback"
//         ].join(", ")
//     },
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056291/s7rathrocmr1j6bzjan1.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056292/hlrqmd9n5rqihefw9nfv.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056294/hlq9pxl6gdoblgpublc3.png"
//           ],
//         "gadgetName": "Gaming Console",
//         "brand": "Sony",
//         "model": "PlayStation 5",
//         "resalePrice": "450",
//         "originalPrice": "500",
//         "salerName": "Sophia Martinez",
//         "sellerEmail": "sophiamartinez@example.com",
//         "sellerPhone": "+1-789-012-3456",
//         "datePosted": "2025-03-04",
//         "color": "White",
//         "originalPurchaseDate": "2023-12-01",
//         "currentCondition": "Excellent - Hardly used, no damage",
//         "gadgetFeatures": [
//             "Ultra-high-speed SSD for lightning-fast loading",
//             "Ray tracing for realistic lighting and shadows",
//             "DualSense controller with haptic feedback",
//             "4K gaming with up to 120Hz refresh rate",
//             "3D Audio for immersive sound experience",
//             "Backward compatibility with PS4 games"
//         ].join(", ")
//     },
//     {
//         "imgUrl": [
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056220/etv6n3ibihkky0skapgr.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056222/g0btihbcurg3bwgmcako.png",
//             "https://res.cloudinary.com/djm2auk8o/image/upload/v1742056230/bcawhepifoyjztvdktko.png"
//           ],
//         "gadgetName": "Wireless Earbuds",
//         "brand": "Apple",
//         "model": "AirPods Pro",
//         "resalePrice": "180",
//         "originalPrice": "250",
//         "salerName": "Liam Anderson",
//         "sellerEmail": "liamanderson@example.com",
//         "sellerPhone": "+1-890-123-4567",
//         "datePosted": "2025-03-03",
//         "color": "White",
//         "originalPurchaseDate": "2023-06-18",
//         "currentCondition": "Very Good - Minor scratches, fully functional",
//         "gadgetFeatures": [
//             "Active noise cancellation for immersive sound",
//             "Transparency mode to hear surroundings",
//             "Sweat and water resistance",
//             "Adaptive EQ for rich, balanced audio",
//             "Up to 24 hours of battery life with case",
//             "Force sensor controls for easy interaction"
//         ].join(", ")
//     }
// ]

// Gadget.insertMany(gadgetDataaa)


app.get("/", (req, res) => {
    res.send("Hello Aparna")
})








app.listen(PORT, () => {
    console.log("App is listening on the port " +  PORT)
})