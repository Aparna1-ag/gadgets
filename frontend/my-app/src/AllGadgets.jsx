import React, { useEffect, useState } from "react";
import img1 from "./assets/gadgets_image.png";
import img2 from "./assets/custom_bg.png";
// import { gadgetData } from './gadgetData'
import { Link } from "react-router";

const AllGadgets = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fetchedData, setFetchedData] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");

  const [uploadedFile, setUploadedFile] = useState([]);
  const [cloudImgUrls, setCloudImgUrls] = useState([]);
  const [loaderDisplay, setLoaderDisplay] = useState("hidden")




  const [gadgetForm, setGadgetForm] = useState({
    gadgetName: "",
    brand: "",
    model: "",
    resalePrice: "",
    originalPrice: "",
    salerName: "",
    sellerEmail: "",
    sellerPhone: "",
    originalPurchaseDate: "",

    gadgetFeatures: "",
    currentCondition: "",
  });

  const [startIndex, setStartIndex] = useState(0)

  let endIndex = startIndex + 6



  let arraysPerPage = fetchedData.slice(startIndex, endIndex)


const paginationBtns = arraysPerPage.map((item, index) =>  {
  return (
    <div key={index}>
         <button  className="btn btn-primary w-10 h-10 ml-3 bg-gradient" onClick={() => {setStartIndex(6 * index)}}> {index} </button>

    </div>
  )
}
)





 

  const todaysDate = new Date();
  const dateOfPosting = todaysDate.toDateString('en-GB', {date: 'numeric', month: 'long', year: 'numeric'});

  const handleFileChange =  (e) => {
    const images =  [...e.target.files];
    setUploadedFile(images);
  

  };

  const handleFileUpload = async () => {
    
    let imageUrlsList = [];
    for (let item of uploadedFile) {
      const imageForm = new FormData();

      imageForm.append("file", item);
      imageForm.append("upload_preset", "stereodevv");
      imageForm.append("cloud_name", "djm2auk8o");

      try {
        const uploadImg = await fetch(
          "https://api.cloudinary.com/v1_1/djm2auk8o/image/upload",
          {
            method: "POST",
            body: imageForm,
          }
        );

        if (uploadImg.ok) {
          const cloudObj = await uploadImg.json();
          console.log(cloudObj)
          imageUrlsList.push(cloudObj.secure_url);
        



        
        } else if (!uploadImg.ok) {
          throw new Error();
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log(imageUrlsList)
    return imageUrlsList

    
  };

  useEffect(() => {
    const fetchgadgetData = async () => {
      try {
        const fetchResponse = await fetch("http://localhost:3300/allgadgets");
        const gadgetData = await fetchResponse.json();
        if (fetchResponse.ok) {
          setFetchedData(gadgetData);
        } else if (!fetchResponse.ok) {
          throw new Error();
        }
      } catch (err) {
        setSuccessMessage("Error fetching gadgets");
      }
    };
    fetchgadgetData();
  }, []);

  const handleChange = (e) => {
    setGadgetForm((gadgetForm) => {
      return { ...gadgetForm, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("post-new-gadget-modal").style.display = "none";

    setLoaderDisplay("block")
    const uploadedImgs = await handleFileUpload()
    // if (uploadedImgs.length === 0) {
    //   setSuccessMessage("No images Uploaded")
    //   return
    // }
    console.log(uploadedImgs)

   
    let myUrl = "http://localhost:3300/allgadgets";
    try {
      const result = await fetch(myUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...gadgetForm,
          datePosted: dateOfPosting,
          imgUrl: uploadedImgs,
        }),
      });

      const resultData = await result.json();

      if (result.ok) {
        setLoaderDisplay("hidden")
        setSuccessMessage(resultData.message);

        setTimeout(() => {
            window.location.reload()
        }, 7000)
      } else if (!result.ok) {
        throw new Error();
      }
    } catch (err) {
      setSuccessMessage("Error posting Gadget " );
    }
  };

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

     
      <div className="wrapper">

      <div className={`fixed top-0 left-0 w-screen h-screen bg-amber-500 flex justify-center overflow-hidden items-center ${loaderDisplay}`}><h2>Loading...</h2></div>
        <header>
          <img
            src="https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp"
            className="mybackground"
          />
          {/* <img src={img1} className='myforeground'  /> */}
          <h1 className="text-white mt-20 mx-20">
            Welcome to the Ultimate Gadget Resale spot!
          </h1>

          <div className="">
          {/* <img src='https://techcircuitworld.com/wp-content/uploads/2024/08/istockphoto-1497558248-612x612-2.webp' className='absolute top-0 left-0 w-full custom-bg-image' /> */}

          <div className="">
            <div className="mx-32 text-white"><h2>{successMessage}</h2></div>

            <div className="flex justify-center w-full py-5">
               
              <button
                className="btn btn-primary btn-lg bg-gradient"
                data-bs-toggle="modal"
                data-bs-target="#post-new-gadget-modal"
              >

<i className="fa-solid fa-plus mr-1"></i>
                 
                Post Your Gadget
              </button>
            </div>

            {/* 
            <form onSubmit={handleFileUpload} className='text-white'>
              <label className='form-label'>Upload images here:</label>
              <input type='file' onChange={handleFileChange}   className='form-control' multiple />
             <br />
              <button className='btn btn-success ml-5' type='submit'  >Upload</button>
            </form> */}

            {/* <img
              src="https://res.cloudinary.com/djm2auk8o/image/upload/v1741991086/xjvwhpn7djdf2mkspwzt.jpg"
              className="w-40 h-40"
            /> */}

            <div className="row mx-auto" style={{ width: "90%" }}>
              {arraysPerPage.map((item, index) => {
                return (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="gadget-cards ">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-xl exo-text">
                            <span> {item.brand} </span>
                            <span> {item.model} </span>
                          </div>

                          <div className="mt-3">
                             
                            Resale Price: 
                            <span className="font-bold">
                               
                              {item.resalePrice}$
                            </span>
                          </div>

                          <div> Seller: {item.salerName}</div>
                          <div className="mt-5">
                             
                            Purchased on: {item.originalPurchaseDate}
                          </div>

                          <div>
                            Posted on: 
                            <span className="font-bold">
                               
                              {item.datePosted}
                            </span>
                          </div>
                        </div>

                        <img src={item.imgUrl.length ? item.imgUrl[0] : 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg' } className='w-40 h-40' />

                     
                      </div>

                      <div className="flex justify-between w-3/4 mx-auto mt-5">
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
                          className="no-underline"
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

        <div className="text-white flex justify-center w-full">
        {paginationBtns}
        </div>
        </header>

       
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

      <div
        className="modal fade"
        id="post-new-gadget-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "#192035" }}
                id="exampleModalLabel"
              >
                Post New Gadget:
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Gadget Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="gadgetName"
                    value={gadgetForm.gadgetName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Brand:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="brand"
                    value={gadgetForm.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Model:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="model"
                    value={gadgetForm.model}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Original Price:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="originalPrice"
                    value={gadgetForm.originalPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Resale Price:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="resalePrice"
                    value={gadgetForm.resalePrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Originally Purchased on:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="originalPurchaseDate"
                    value={gadgetForm.originalPurchaseDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Upload Files:
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                    multiple
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Describe features:
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="13.4-inch InfinityEdge 4K UHD+ display"
                    name="gadgetFeatures"
                    value={gadgetForm.gadgetFeatures}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Describe Current Condition:
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                    name="currentCondition"
                    value={gadgetForm.currentCondition}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Your email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="sellerEmail"
                    value={gadgetForm.sellerEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Your contact:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="sellerPhone"
                    value={gadgetForm.sellerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="salerName"
                    value={gadgetForm.salerName}
                    onChange={handleChange}
                    required
                  />
                </div>

            
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success btn-sm bg-gradient"
                  style={{ background: "" }}
                >
                  Post
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm bg-gradient"
                  data-bs-dismiss="modal"
                  style={{ background: "#192035" }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGadgets;
