import React, { useEffect, useState } from "react";
import img1 from "./assets/gadgets_image.png";
import img2 from "./assets/custom_bg.png";
// import { gadgetData } from './gadgetData'
import { Link } from "react-router";
import Navbar from "./Navbar";

const AllGadgets = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fetchedData, setFetchedData] = useState([]);










  let intialStartIndex = 0
let clickedBtnIndex = sessionStorage.getItem('clickedBtnIndex')
if (clickedBtnIndex) {
  intialStartIndex = parseInt(clickedBtnIndex) * 10
}

  let [startIndex, setStartIndex] = useState(intialStartIndex)





  let endIndex = startIndex + 10

  if (endIndex === fetchedData.length) {
    endIndex = fetchedData.length - 1
  } 



  let arraysPerPage = fetchedData.slice(startIndex, endIndex)

  let noOfBtns = Math.floor((fetchedData.length/10) + 1)
  // console.log(noOfBtns)
 
const arrayForMapping = (start, end) => Array.from({length: end - start}, (_ ,i ) => 0 + i )

const btnsArray = arrayForMapping(1, noOfBtns)
const [pageNo, setPageNo] = useState(1)
// console.log(btnsArray)

const handlePgnBtnClick = (clickedInd) => {
  setStartIndex(10 * clickedInd)
  // setPageNo(clickedInd + 1)
  sessionStorage.setItem('clickedBtnIndex', JSON.stringify(clickedInd))
  
  console.log(clickedInd)
}


const paginationBtns = btnsArray.map((item, index) =>  {
  return (
    <div key={index} className="mx-2">
         <button  className="btn btn-primary w-10 h-10 bg-gradient" onClick={() => {handlePgnBtnClick(index)}}> {index + 1} </button>

    </div>
  )
}
)


  useEffect(() => {
    const fetchgadgetData = async () => {
      try {
        const fetchResponse = await fetch("http://localhost:3300/allgadgets");
        const gadgetData = await fetchResponse.json();
        if (fetchResponse.ok) {
          setFetchedData(gadgetData.reverse());
        } else if (!fetchResponse.ok) {
          throw new Error();
        }
      } catch (err) {
        setErrorMessage("Error fetching gadgets");
      }
    };
    fetchgadgetData();
  }, []);





  useEffect(() => {
    const contactModal = document.getElementById("contact-info-modal");

    contactModal.addEventListener("show.bs.modal", (e) => {
      const modalBtn = e.relatedTarget;
      setEmail(modalBtn.getAttribute("data-bs-email"));
      setPhone(modalBtn.getAttribute("data-bs-phone"));
    });

    return () => {
      contactModal.removeEventListener("show.bs.modal", () => {});
    };
  }, []);



  return (
    <div>
 <Navbar  />

 

 <div className="wrappers-wrapper">
     
      <div className="wrapper">

     

   
        <header>
       
          <img
            src="https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp"
            className="mybackground"
          />
          {/* <img src={img1} className='myforeground'  /> */}
         <div className="flex justify-center items-center" style={{height: "100vh"}}>
         <h1 className="text-white text-center">
            Welcome to the Ultimate Gadget Resale spot!
          </h1>



         </div>

         
{
    fetchedData.length == 0 && 
    <div className="text-3xl text-white text-center w-full">  Oops! Seems like an error. Unable to fetch Gadgets. Please refresh and try again.</div>
   }


          <div className="relative ">
          {/* <img src='https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp' className='absolute top-0 left-0 w-full custom-bg-image' /> */}
          <div className='absolute top-0 left-0 w-full custom-bg-image'>

          </div>

          <div className="">
            {/* <div className="mx-32 text-white"><h2>{successMessage}</h2></div> */}

            <Link  to = "/postnewgadget" className="flex justify-center w-full py-5 text-decoration-none">
               
              <div
                className="btn btn-primary btn-lg bg-gradient"
               
              >

<i className="fa-solid fa-plus mr-1"></i>
                 
                Post Your Gadget
              </div>
            </Link>


            <div className="row mx-auto cards-container" >
              {/* <p className="text-white">Page: {pageNo}</p> */}
                <div className="w-full flex justify-end"><p className="text-white">Page: { (Math.floor(startIndex/10)) + 1 }</p></div>

              {arraysPerPage.map((item, index) => {
                return (
                  <div className="col-sm-12 col-md-9 col-lg-6 mb-4 mx-auto " key={index}>


                    <div className="gadget-cards animate-fade-down animate-duration-1000 animate-delay-[3000ms]  ">
                    <Link
                          to={`/gadgetdetails/${item._id}`} className="">
                            <div className="w-full flex justify-center"><img src={item.imgUrl.length ? item.imgUrl[0] : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' } className='block md:hidden w-52 h-52 mb-5' style={{objectFit: "contain"}}/></div>

</Link> 
                      <div className="flex justify-between">
                        <div>
                          <div className="text-xl exo-text">
                            <span> {item.brand} </span>
                            <span> {item.model} </span>
                          </div>

                          <div className="mt-3">
                             
                            Resale Price: {" "}  
                              <span className="font-bold">
                               
                               {item.resalePrice}$
                            </span>
                          </div>

                          <div> Seller:  {item.salerName}</div>
                          <div className="mt-5">
                             
                            Purchased on:  {item.originalPurchaseDate}
                          </div>

                          <div>
                            Posted on: {" "}  
                              <span className="font-bold">
                               
                               {item.datePosted}
                            </span>
                          </div>
                        </div>

                       

                        <Link
                          to={`/gadgetdetails/${item._id}`}><img src={item.imgUrl.length ? item.imgUrl[0] : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' } className='hidden md:block w-40 h-40' style={{objectFit: "contain"}}/>

</Link> 
                

                     
                      </div>

                      <div className="flex justify-between w-full md:w-4/5 lg:w-3/4 mx-auto mt-5">
                        <button
                          className=" custom-btn btn-green mr-4"
                          data-bs-toggle="modal"
                          data-bs-target="#contact-info-modal"
                          data-bs-email={item.sellerEmail}
                          data-bs-phone={item.sellerPhone}
                        >
                           
                          <i className="fa-solid fa-address-card mr-1"></i> 
                          Contact Seller
                        </button>

                        <Link
                          to={`/gadgetdetails/${item._id}`}
                          className="no-underline text-decoration-none"
                        >
                          <div className="custom-btn btn-pink ">
                             
                            <i className="fa-solid fa-forward mr-1"></i> More
                            Details
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      <div className=" w-full flex justify-center mt-5 pb-5">
      <div className="text-white flex mx-auto">
        {paginationBtns}
        
        </div>
      </div>
        </header>

       
      </div>

      </div>

      <div
        className="modal fade"
        id="contact-info-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Contact's Contact Info
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-1">
                Email: <span className="font-bold">{email}</span>
              </div>
              <div className="mt-3">
                Phone: <span className="font-bold">{phone}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm bg-gradient"
                data-bs-dismiss="modal"
                style={{ background: "#192035" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

   


    </div>
  );
};

export default AllGadgets;
