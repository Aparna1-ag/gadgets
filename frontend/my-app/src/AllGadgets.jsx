import React from 'react'
import img1 from "./assets/gadgets_image.png"
import img2 from "./assets/custom_bg.png"


const AllGadgets = () => {

    let gadgetData = [

        {
            imgUrl: "",
            gadgetName: "Smartphone",
            brand: "Apple",
            model: "iPhone 13 Pro",
            resalePrice: "750",
            originalPrice: "999",
            salerName: "John Doe",
            datePosted: "2025-03-09",
            color: "Graphite"
        },
        {
            imgUrl: "",
            gadgetName: "Laptop",
            brand: "Dell",
            model: "XPS 13",
            resalePrice: "950",
            originalPrice: "1200",
            salerName: "Alice Smith",
            datePosted: "2025-03-08",
            color: "Silver"
        },
        {
            imgUrl: "",
            gadgetName: "Tablet",
            brand: "Samsung",
            model: "Galaxy Tab S7",
            resalePrice: "400",
            originalPrice: "650",
            salerName: "Michael Brown",
            datePosted: "2025-03-07",
            color: "Mystic Black"
        },
        {
            imgUrl: "",
            gadgetName: "Smartwatch",
            brand: "Garmin",
            model: "Fenix 6",
            resalePrice: "350",
            originalPrice: "600",
            salerName: "Emma Wilson",
            datePosted: "2025-03-06",
            color: "Titanium"
        },
        {
            imgUrl: "",
            gadgetName: "Headphones",
            brand: "Sony",
            model: "WH-1000XM4",
            resalePrice: "200",
            originalPrice: "350",
            salerName: "David Johnson",
            datePosted: "2025-03-05",
            color: "Black"
        },
        {
            imgUrl: "",
            gadgetName: "Gaming Console",
            brand: "Sony",
            model: "PlayStation 5",
            resalePrice: "450",
            originalPrice: "500",
            salerName: "Sophia Martinez",
            datePosted: "2025-03-04",
            color: "White"
        },
        {
            imgUrl: "",
            gadgetName: "Wireless Earbuds",
            brand: "Apple",
            model: "AirPods Pro",
            resalePrice: "180",
            originalPrice: "250",
            salerName: "Liam Anderson",
            datePosted: "2025-03-03",
            color: "White"
        },
        {
            imgUrl: "",
            gadgetName: "Smart TV",
            brand: "LG",
            model: "OLED C1 55-inch",
            resalePrice: "900",
            originalPrice: "1400",
            salerName: "Olivia Garcia",
            datePosted: "2025-03-02",
            color: "Black"
        },
        {
            imgUrl: "",
            gadgetName: "Camera",
            brand: "Canon",
            model: "EOS R5",
            resalePrice: "2800",
            originalPrice: "3500",
            salerName: "Ethan Robinson",
            datePosted: "2025-03-01",
            color: "Black"
        }

    ]
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
                <div className='row mx-auto' style={{width: '90%'}}>

                    {
                        gadgetData.map(item => {
                            return (



                                <div className='col-md-6 mb-4'   >


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
                                      <div className='mt-5'>  Original Price: {item.originalPrice}$ 
                                          </div>

                                      <div>Posted on: <span className='font-bold'> {item.datePosted}</span>

                                  


                                      </div>
                                      
                                        </div>


                                        {/* <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671097" className='w-40 h-40' /> */}

                                        <div id="carouselExampleIndicators" class="carousel slide w-48 h-48" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active ">
      <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671097" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGZdex_bY3K7zG3xjoayc_k2VfZPaiPXu11SqgKdSmt2YHiAN2ahvksBIC9ScxAiRcbtk&usqp=CAU" class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item">
      <img src="https://static.bhphoto.com/images/multiple_images/images500x500/1389748872_IMG_364121.jpg" class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                                   
                                   
                                      


                                    </div>



                                    <div className='flex justify-between w-3/4 mx-auto mt-5'>
                                     <button className=' custom-btn btn-green mr-4' data-bs-toggle="modal" data-bs-target="#contact-info-modal"> <i class="fa-solid fa-address-card mr-1"></i> Contact Seller</button>
                                     <button className='custom-btn btn-pink '> <i class="fa-solid fa-forward mr-1"></i>  More Details</button>
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



            <div class="modal fade" id="contact-info-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title " style={{color: "#192035"}} id="exampleModalLabel">Contact's Contact Info</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div  className='mt-1'>Email: <span className='font-bold'>abc@email.com</span></div>
        <div className='mt-3'>Phone: <span className='font-bold'>9964645363</span></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm bg-gradient" data-bs-dismiss="modal" style={{background: "#192035"}}>Close</button>
      </div>
    </div>
  </div>
</div>
          

        </div>
    )
}

export default AllGadgets
