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


    const markUpPercentage = (myGadgetData.resalePrice ) * 100/myGadgetData.originalPrice
    


  return (
    <div className='w-100  h-100 '>
        {/* <div>

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




        </div> */}




<div className='w-5/6 mx-auto py-6'>

<h1>{myGadgetData.brand}  -
{myGadgetData.model} </h1>


<div id="carouselExampleControls"  className="carousel slide" data-ride="carousel">
  <div  className="carousel-inner">


    {myGadgetData.imgUrl || myGadgetData.imgUrl?.length > 0 ? myGadgetData.imgUrl.map((item, index) => {
      return (
        <div key={index} className={`carousel-item ${item == myGadgetData.imgUrl[0] ? 'active' : ''}`}>
        <img  className="d-block mx-auto" src={item} alt="Second slide"  style={{width:'80%', height: '500px', objectFit: 'cover'}} />
      </div>
      )
    }) :         <div className={`carousel-item shadow-2xl active`}>
<img className="d-block shadow-2xl" alt="Second slide"  style={{width:'100%', height: '400px'}} src='https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' /> 
</div>
}
  </div>
  <button  className="carousel-control-prev" data-bs-target="#carouselExampleControls" role="button" data-bs-slide="prev">
    <span  className="carousel-control-prev-icon " aria-hidden=""></span>
    <span  className="sr-only">Previous</span>
  </button>
  <button  className="carousel-control-next" data-bs-target="#carouselExampleControls" role="button" data-bs-slide="next">
    <span  className="carousel-control-next-icon" aria-hidden="true"></span>
    <span  className="sr-only">Next</span>
  </button>
</div>



<div className='w-full mt-5'>
 <div className='flex justify-between'>
 <div className='px-4 py-4 mt-2 shadow-xl   hover:bg-slate-400 hover:text-white'> Resale Price:  <span className='font-bold'>            ${myGadgetData.resalePrice}  <span className='text-info font-bold'>({markUpPercentage}%)</span>
  </span>
  </div>
 <div className='flex '>
 <div className='px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Original Price:  <span className='font-bold'>            ${myGadgetData.originalPrice}  
  </span>
  </div>
  <div className=' ml-3 px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Originally purchased on:  <span className='font-bold'>            {myGadgetData.originalPurchaseDate}
  </span>
  </div>
 </div>
 </div>

 <div className='flex justify-between'>

 <div className='px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Posted by:  <span className='font-bold'>            {myGadgetData.salerName}
  </span>
  </div>

<div className='flex '>

 <div className='px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Phone:  <span className='font-bold'>            {myGadgetData.sellerPhone}
  </span>
  </div>


  <div className='ml-3 px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Email:  <span className='font-bold'>            {myGadgetData.sellerEmail}
  </span>
  </div>
</div>
 </div>
  <div className='px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Salient Features:  <span className='font-bold'>            {myGadgetData.gadgetFeatures} Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sint accusantium aliquam quisquam mollitia minus obcaecati. Dolores cupiditate illo beatae sapiente, assumenda velit exercitationem quia, voluptatum, iure nulla ipsam labore.
  </span>
  </div>
  <div className='px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Current Condition:  <span className='font-bold'>            {myGadgetData.currentCondition} Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus soluta temporibus, labore officiis illum maiores explicabo placeat rerum quas ipsa? Minus ipsa libero fugiat nostrum quidem dolorum harum aliquam voluptates!
  </span>
  </div>

  <div className='px-4 py-4 mt-2 shadow-xl  hover:bg-slate-400 hover:text-white'> Posted on:  <span className='font-bold'>            {myGadgetData.datePosted} 
  </span>
  </div>





</div>




</div>







      
    </div>
  )
}

export default GadgetDetails
