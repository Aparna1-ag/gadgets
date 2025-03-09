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
                    <img src='https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp' className='absolute top-0 left-0 w-full custom-bg-image' />


                    <div className='container absolute top-0 left-0 w-full flex justify-center'   >
                <div className='row mx-auto' style={{width: '90%'}}>

                    {
                        gadgetData.map(item => {
                            return (



                                <div className='col-md-4'   >


                                    <div className='mt-3 w-100 gadget-cards'>
                                        <div>  {item.gadgetName}  </div>
                                        <div> {item.brand}  </div>
                                        <div>   {item.model}  </div>
                                    </div>

                                </div>




                            )

                        })
                    }
                </div>
            </div>

                </div>



            </div>
          

        </div>
    )
}

export default AllGadgets
