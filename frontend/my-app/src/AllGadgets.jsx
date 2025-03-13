import React, { useEffect, useState } from 'react'
import img1 from "./assets/gadgets_image.png"
import img2 from "./assets/custom_bg.png"
// import { gadgetData } from './gadgetData'
import { Link } from 'react-router'


const AllGadgets = () => {

const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')

const [fetchedData, setFetchedData] = useState([])

const [successMessage, setSuccessMessage] = useState('')





useEffect(() => {
  const fetchgadgetData = async () => {
    try {
      const fetchResponse = await fetch("http://localhost:3300/allgadgets")
     const gadgetData = await fetchResponse.json()
    if (fetchResponse.ok) {
        setFetchedData(gadgetData)
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


const [gadgetForm, setGadgetForm] = useState({
  gadgetName: '',
  brand: '',
  model: '',
  resalePrice: '',
  originalPrice: '',
  salerName: '',
  sellerEmail: '',
  sellerPhone: '',
  originalPurchaseDate: '',
  
  gadgetFeatures: '',
  currentCondition: '',
  



})

const todaysDate = new Date()
const dateOfPosting = todaysDate.toDateString()



const handleChange = (e) => {
  
    setGadgetForm((gadgetForm) => {
      return (
        {...gadgetForm, [e.target.name] : e.target.value}
      )
    })
 

}

const handleSubmit = async (e) => {
  e.preventDefault()
  let myUrl = 'http://localhost:3300/allgadgets'
 try {
  const result = await fetch(myUrl, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({...gadgetForm, datePosted: dateOfPosting})
  })

  
  const resultData = await result.json()

  if (result.ok) {
    setSuccessMessage(resultData.message)
    document.getElementById('post-new-gadget-modal').style.display = "none"

    

  } else if  (!result.ok) {
      throw new Error
  }

 
 } catch (err) {
  setSuccessMessage("Error posting User: " + resultData.message)
}

}


useEffect(() => {
 const contactModal = document.getElementById('contact-info-modal')
 
 contactModal.addEventListener('show.bs.modal', (e) => {
  const modalBtn = e.relatedTarget
   setEmail(modalBtn.getAttribute('data-bs-email'))
   setPhone(modalBtn.getAttribute('data-bs-phone'))

 } )

 return () => {
  contactModal.removeEventListener('show.bs.modal', () => {} )
 }


}, [])

  
    return (


        <div>
            <div className='wrapper'>




                <header>
                    <img src='https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp' className='mybackground' />
                    {/* <img src={img1} className='myforeground'  /> */}
                    <h1 className='text-white'>Welcome to the Ultimate Gadget Resale spot!</h1>
                </header>



                <div className='relative'>
                    {/* <img src='https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp' className='absolute top-0 left-0 w-full custom-bg-image' /> */}


                    <div className='w-full absolute top-0 left-0 custom-bg-image'>

                    <div className='mx-32 text-white'>{successMessage}</div>


                     <div className='flex justify-center w-full py-5'> <button className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#post-new-gadget-modal' >  Post Your Gadget</button></div>



                <div className='row mx-auto' style={{width: '90%'}}>

                    {
                        fetchedData.map((item, index) => {
                            return (



                                <div className='col-md-6 mb-4' key={index} >


                                    <div className='gadget-cards '>

                                   <div className='flex justify-between'>

                                   <div>
                                      <div className='text-xl exo-text'>   
                                         <span> {item.brand}  </span>
                                      <span>   {item.model}  </span> 
                                       </div>

                                       <div className='mt-3'> Resale Price: <span className='font-bold'>  {item.resalePrice}$</span></div>


                                      <div> Seller: {item.salerName}
                                        

                                      </div>
                                      <div className='mt-5'>  Purchased on: {item.originalPurchaseDate} 
                                          </div>

                                      <div>Posted on: <span className='font-bold'> {item.datePosted}</span>

                                  


                                      </div>
                                      
                                        </div>


                                        {/* <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671097" className='w-40 h-40' /> */}

                                        <div id="carouselExampleIndicators" className="carousel slide w-48 h-48" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active ">
      <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671097" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZdex_bY3K7zG3xjoayc_k2VfZPaiPXu11SqgKdSmt2YHiAN2ahvksBIC9ScxAiRcbtk&usqp=CAU" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://static.bhphoto.com/images/multiple_images/images500x500/1389748872_IMG_364121.jpg" className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
                                   
                                   
                                      


                                    </div>



                                    <div className='flex justify-between w-3/4 mx-auto mt-5'>
                                     <button className=' custom-btn btn-green mr-4' data-bs-toggle="modal" data-bs-target="#contact-info-modal" data-bs-email={item.sellerEmail}  data-bs-phone={item.sellerPhone} > <i className="fa-solid fa-address-card mr-1"></i> Contact Seller</button>
                                    
                                    <Link to={`/gadgetdetails/${item._id}`} className='no-underline'>
                                    <div className='custom-btn btn-pink '> <i className="fa-solid fa-forward mr-1"></i>  More Details</div>
                                    </Link>
                                

                                        </div>
                                    
                                    
                                    </div>

                                   

                                </div>




                            )

                        })
                    }
                </div>
            </div>

                </div>



            </div>



            <div className="modal fade" id="contact-info-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title " style={{color: "#192035"}} id="exampleModalLabel">Contact's Contact Info</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div  className='mt-1'>Email: <span className='font-bold'>{email}</span></div>
        <div className='mt-3'>Phone: <span className='font-bold'>{phone}</span></div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary btn-sm bg-gradient" data-bs-dismiss="modal" style={{background: "#192035"}}>Close</button>
      </div>
    </div>
  </div>
</div>


<div className="modal fade" id="post-new-gadget-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title " style={{color: "#192035"}} id="exampleModalLabel">Post New Gadget:</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form className='' onSubmit={handleSubmit}> 
      <div className="modal-body">

      
       <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Gadget Name:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="gadgetName" value={gadgetForm.gadgetName} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Brand:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="brand"  value={gadgetForm.brand} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Model:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="model"  value={gadgetForm.model} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Original Price:</label>
    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="originalPrice"  value={gadgetForm.originalPrice} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Resale Price:</label>
    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="resalePrice"  value={gadgetForm.resalePrice} onChange={handleChange} required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Originally Purchased on:</label>
    <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="originalPurchaseDate" value={gadgetForm.originalPurchaseDate} onChange={handleChange} required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Describe features:</label>
    <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='13.4-inch InfinityEdge 4K UHD+ display' name="gadgetFeatures" value={gadgetForm.gadgetFeatures} onChange={handleChange}  required>
       </textarea>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Describe Current Condition:</label>
    <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='' name="currentCondition" value={gadgetForm.currentCondition} onChange={handleChange} required>
       </textarea>
  </div>


  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Your email:</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="sellerEmail" value={gadgetForm.sellerEmail} onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Your contact:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="sellerPhone" value={gadgetForm.sellerPhone} onChange={handleChange} required />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Your Name:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="salerName" value={gadgetForm.salerName} onChange={handleChange} required />
  </div>
      
      </div>
      <div className="modal-footer">
      <button type="submit" className="btn btn-success btn-sm bg-gradient" style={{background: ""}}>Post</button>
      

        <button type="button" className="btn btn-secondary btn-sm bg-gradient" data-bs-dismiss="modal" style={{background: "#192035"}}>Close</button>

      </div>
      </form>
    
    </div>
  </div>
</div>



  
          

        </div>
    )
}

export default AllGadgets
