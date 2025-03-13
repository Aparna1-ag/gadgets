import { useEffect } from 'react'
import React, {useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router'

const GadgetDetails = () => {



    const gadgetId = useParams()
   

    const [myGadgetData, setMyGadgetData] = useState([])
    
    const [successMessage, setSuccessMessage] = useState('')
    
    
    
    
    
    useEffect(() => {
      const fetchgadgetData = async () => {
        try {
          const fetchResponse = await fetch("http://localhost:3300/allgadgets")
         const gadgetData = await fetchResponse.json()
        if (fetchResponse.ok) {
            const reqdGadget = gadgetData.find(item => item._id == gadgetId.id)
            setMyGadgetData(reqdGadget)

        }
      
        else if (!fetchResponse.ok) {
          throw new Error
        }
        
        } catch (err) {
          setSuccessMessage("Error fetching gadgets")
        }
      }
      fetchgadgetData()
    }, [])
    


  return (
    <div>
        <div>

            <div> <h1>Gadget Details Page </h1> </div>
            {successMessage}
            {gadgetId.id}
            {myGadgetData.brand}
            {myGadgetData.model}
            {myGadgetData.gadgetName}
            {myGadgetData.resalePrice}
            {myGadgetData.originalPrice}
            {myGadgetData.originalPurchaseDate}
            {myGadgetData.gadgetFeatures}
            {myGadgetData.currentCondition}
            {myGadgetData.salerName}
            {myGadgetData.sellerEmail}
            {myGadgetData.sellerPhone}




        </div>

      
    </div>
  )
}

export default GadgetDetails
