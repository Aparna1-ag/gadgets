import { useEffect } from 'react'
import React, {useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router'
import Navbar from './Navbar'

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

    const calcPercentage = (myGadgetData.resalePrice ) * 100/myGadgetData.originalPrice
    const markUpPercentage = calcPercentage.toFixed(2)

    let featuresArray = []
    if (myGadgetData.gadgetFeatures) {
      featuresArray = myGadgetData.gadgetFeatures.split(",")
      
    }

    

  return (
    <div className='w-100  '>
      <Navbar />


      



<div className='w-5/6 mx-auto py-6 mt-24'>

<h1 className='gadget-name my-6'>{myGadgetData.brand}  -
{myGadgetData.model} </h1>


<div id="carouselExampleControls "  className="carousel slide" data-ride="carousel">
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
    <span  className=" text-secondary w-12 h-12 rounded-full flex justify-center items-center " aria-hidden=""><i class="fa-solid fa-angle-left text-4xl"></i></span>
    <span  className="sr-only">Previous</span>
  </button>
  <button  className="carousel-control-next" data-bs-target="#carouselExampleControls" role="button" data-bs-slide="next">
    <span  className=" text-secondary w-12 h-12 rounded-full flex justify-center items-center" aria-hidden="true"><i class="fa-solid fa-angle-right text-4xl"></i></span>
    <span  className="sr-only">Next</span>
  </button>
</div>



<div className='w-full mt-5'>
 <div className='flex justify-between'>
 <div className='px-4 py-4 mt-2 shadow-md bg-blue-100   hover:bg-blue-400 hover:text-white'> <span className='text-primary'>Resale Price: </span> <span className='font-bold'>            ${myGadgetData.resalePrice}  <span className='text-secondary font-bold'>({markUpPercentage}%)</span>
  </span>
  </div>
 <div className='flex '>
 <div className='px-4 py-4 mt-2 shadow-md bg-blue-100  hover:bg-blue-400 hover:text-white'> <span className='text-primary'>Original Price: </span> <span className='font-bold'>            ${myGadgetData.originalPrice}  
  </span>
  </div>
  <div className=' ml-3 px-4 py-4 mt-2 shadow-md bg-blue-100  hover:bg-blue-400 hover:text-white'> <span className='text-primary'>Originally Purchased On: </span> <span className='font-bold'>            {myGadgetData.originalPurchaseDate}
  </span>
  </div>
 </div>
 </div>

<div className='border-1 border-slate-100 mt-4 shadow-md shadow-blue-200'>
<div className='flex justify-between'>

<div className='px-4 py-4 mt-2   hover:bg-slate-400 hover:text-white'> Posted by:  <span className='font-bold'>            {myGadgetData.salerName}
 </span>
 </div>

<div className='flex '>

<div className='px-4 py-4 mt-2   hover:bg-slate-400 hover:text-white'> Phone:  <span className='font-bold'>            {myGadgetData.sellerPhone}
 </span>
 </div>


 <div className='ml-3 px-4 py-4 mt-2   hover:bg-slate-400 hover:text-white'> Email:  <span className='font-bold'>            {myGadgetData.sellerEmail}
 </span>
 </div>
</div>
</div>
 <div className='px-4 pt-4 mt-2  '> Salient Features:  <span className='font-bold'> 
  <ul className='mt-3'>
    {featuresArray && featuresArray.map((item, index )=> {
      return (
        <li key={index} className='list-disc w-full mt-1 py-3 pl-4 hover:bg-blue-400 hover:text-white'> {item} </li>
      )
    })}
    </ul>          
 </span>


 </div>

 <div className=' mt-4 px-4 py-4  hover:bg-slate-400 hover:text-white'> Current Condition:  <span className='font-bold'>            {myGadgetData.currentCondition} Lorem ipsum dolor sit amet consectetur adipisicing elit. 
 </span>
 </div>


</div>



  

  <div className='px-4 py-4 mt-2 shadow-md shadow-blue-200  hover:bg-slate-400 hover:text-white'> Posted on:  <span className='font-bold'>            {myGadgetData.datePosted} 
  </span>
  </div>





</div>




</div>







      
    </div>
  )
}

export default GadgetDetails
