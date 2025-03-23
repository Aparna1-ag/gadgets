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
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
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
        res.status(500).json({message: "Error creating new user"});
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
        res.status(500).json({message: "Error creating new gadget"})
    }
})


app.get('/allgadgets', async (req, res) => {
   try {
    const myDbData = await Gadget.find()
    res.json(myDbData)
   } catch (err) {
    res.status(500).json({message : "Error fetching gadgets"})
   }
})


app.delete('/allgadgets/:id', async (req, res) => {
    try {
        const { id } = req.params
    const itemDeleted = await Gadget.findByIdAndDelete(id)

    if (!itemDeleted) {
        return res.status(404).json({message: "Item not found"})
    }
   
    res.json({message: "item deleted"}) 

   

    } catch (err) {
       res.status(500).json({message: "error deleting gadget"})
    }
})


app.patch('/allgadgets/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body
        const updateInfo = await Gadget.findByIdAndUpdate(id, updates, {new: true, runValidators: true})
        if (!updateInfo) {
            return res.status(404).json({message: "Update not found"})
        }
        console.log(updates)

        console.log(updateInfo)

        res.json({message: "Gadget updated!"})
 
    } catch (err) {
        res.status(500).json({message: "Error updating info"})
    }
})


const gadgetDataaa = [
    {
    
        "gadgetName": "Laptop",
        "brand": "HP",
        "model": "Pavillion X360",
        "resalePrice": 800,
        "originalPrice": 1100,
        "salerName": "linda@email.com",
        "sellerEmail": "linda@email.com",
        "sellerPhone": "+91577974939",
        "datePosted": "23 March 2025",
        "originalPurchaseDate": "2023-04-23",
        "currentCondition": "Laptop working fine, charger not working",
        "gadgetFeatures": "11th Gen Intel Core i5-1155G7, 15.6-inch (39.6 cm), FHD, 16GB DDR4, 512GB SSD, Intel Iris Xe Graphics, Backlit KB",
        "imgUrl": [
          "https://res.cloudinary.com/djm2auk8o/image/upload/v1742686919/p5abzqb1lbkheahulefv.jpg",
          "https://res.cloudinary.com/djm2auk8o/image/upload/v1742686919/k6ynur2prw1iqn17iw4w.jpg"
        ]
      },
  {
    
    "gadgetName": "Tablet",
    "brand": "Samsung",
    "model": "Galaxy Tab S7",
    "resalePrice": 400,
    "originalPrice": 650,
    "salerName": "Michael Brown",
    "sellerEmail": "michaelbrown@example.com",
    "sellerPhone": "+1-456-789-0123",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2024-04-23",
    "currentCondition": "Good - Some scratches, works perfectly",
    "gadgetFeatures": "11-inch LTPS TFT display with 120Hz refresh rate,\n            Qualcomm Snapdragon 865+ processor,\n            S Pen included with ultra-low latency,\n            Quad speakers tuned by AKG with Dolby Atmos,\n            Supports DeX mode for a PC-like experience,\n            Large 8000mAh battery with fast charging",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742684787/qlugja3gxzmsltxp0xhn.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742684788/plhuvqwemwaithadgumv.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742684788/kfr5apodxzyep137eun6.jpg"
    ]
  },
  {
    
    "gadgetName": "Gaming Console",
    "brand": "Sony",
    "model": "PlayStation 4",
    "resalePrice": 450,
    "salerName": "",
    "sellerEmail": "sophiamartinez@example.com",
    "sellerPhone": "+1-789-012-3456",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2024-07-23",
    "currentCondition": "Excellent - Hardly used, no damage",
    "gadgetFeatures": "",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742685107/guevjo8mcbgflaegp9kg.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742685108/p5kyemigdqhwziuvpp02.jpg"
    ]
  },
  {
    
    "gadgetName": "Wireless Earbuds",
    "brand": "Apple",
    "model": "Airpod Pro",
    "resalePrice": 180,
    "originalPrice": 250,
    "salerName": "Liam Anderson",
    "sellerEmail": "liamanderson@example.com",
    "sellerPhone": "+1-890-123-4567",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2024-02-23",
    "currentCondition": "Very Good - Minor scratches, fully functional",
    "gadgetFeatures": "Active noise cancellation for immersive sound,\n            Transparency mode to hear surroundings,\n            Sweat and water resistance,\n            Adaptive EQ for rich, balanced audio\n          ",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742685884/mfvfqpj9gz0qeyzazu3a.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742685885/l3mkpjcws2ypdgpgto0g.webp",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742685886/umzpuzugquzthmszgvjp.jpg"
    ]
  },
  {
    
    "gadgetName": "Smartwatch",
    "brand": "Garmin",
    "model": "Fenix 6",
    "resalePrice": 350,
    "originalPrice": 600,
    "salerName": "emmawilson@example.com",
    "sellerEmail": "emmawilson@example.com",
    "sellerPhone": "+1-567-890-1235",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2024-08-12",
    "currentCondition": "Like New - Barely used",
    "gadgetFeatures": "1.3-inch always-on display with scratch-resistant glass,\n            Advanced GPS and heart rate monitoring,\n            Preloaded sports apps and performance metrics,\n            Water-resistant up to 100 meters\n           ",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742686122/uqh05s7yej0yklaogeix.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742686122/h7exykpsqdztd7dlm5xw.jpg"
    ]
  },
  {
    
    "gadgetName": "Smartphone",
    "brand": "Apple",
    "model": "iPhone 13 Pro",
    "resalePrice": 770,
    "originalPrice": 999,
    "salerName": "John Doe",
    "sellerEmail": "johndoe@example.com",
    "sellerPhone": "+1-234-567-8901",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2023-02-23",
    "currentCondition": "Excellent - No scratches, fully functional",
    "gadgetFeatures": "6.1-inch Super Retina XDR display,\nA15 Bionic chip for lightning-fast performance,\nTriple-camera system with LiDAR scanner,\n5G enabled for ultra-fast connectivity,\nCeramic Shield for improved durability,\nProMotion technology with 120Hz refresh rate",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742683450/bg9nsixrjundkpqozkky.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742683451/kftvphhipc2o0p14saqt.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742683451/f1hlcbl8bs2n147jdd5h.jpg"
    ]
  },
 
  {
    
    "gadgetName": "Headphones",
    "brand": "Sony",
    "model": "WH-1000XM4",
    "resalePrice": 150,
    "originalPrice": 350,
    "salerName": "David Johnson",
    "sellerEmail": "davidjohnson@example.com",
    "sellerPhone": "+1-678-901-2345",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2023-08-23",
    "currentCondition": "Fair - Visible wear, works well",
    "gadgetFeatures": "Industry-leading noise cancellation technology,\n            Up to 30 hours of battery life,\n            Touch controls for volume and playback",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742686585/f9esntujesjpkcdqlqtc.jpg",
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742686585/maj83npequnyhjaaagsz.jpg"
    ]
  },
 
  {
    
    "gadgetName": "Power Bank",
    "brand": "Boat",
    "model": "XT-3308",
    "resalePrice": 250,
    "originalPrice": 400,
    "salerName": "Maya",
    "sellerEmail": "Maya@email.com",
    "sellerPhone": "7656583783",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2024-11-23",
    "currentCondition": "All good - almost new, just got gifted another one so don't need it",
    "gadgetFeatures": "Lithium Polymer, Fast Charging, Quick Charge 3.0",
    "imgUrl": [
      "https://res.cloudinary.com/djm2auk8o/image/upload/v1742687154/qjf5tta3ho3fduxex7gy.webp"
    ]
  },
  {
    
    "gadgetName": "Laptop",
    "brand": "Dell",
    "model": "XPS 13",
    "resalePrice": 950,
    "originalPrice": 1200,
    "salerName": "Alice Smith",
    "sellerEmail": "alicesmith@example.com",
    "sellerPhone": "+1-345-678-9012",
    "datePosted": "23 March 2025",
    "originalPurchaseDate": "2023-07-23",
    "currentCondition": "Very Good - Minor wear, fully functional",
    "gadgetFeatures": "13.4-inch InfinityEdge 4K UHD+ display,\nIntel Core i7 11th Gen processor,\n16GB RAM and 512GB SSD storage,\nUltra-thin and lightweight design,\nLong battery life up to 14 hours,\nBacklit keyboard with fingerprint reader",
    "imgUrl": []
  }
]


Gadget.insertMany(gadgetDataaa)














app.get("/", (req, res) => {
    res.send("Hello Aparna")
})








app.listen(PORT, () => {
    console.log("App is listening on the port " +  PORT)
})