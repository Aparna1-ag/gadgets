import React, { useEffect, useState } from "react";
import img1 from "./assets/gadgets_image.png";
import img2 from "./assets/custom_bg.png";
// import { gadgetData } from './gadgetData'
import { Link } from "react-router";
import Navbar from "./Navbar";

const AddNewGadget = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fetchedData, setFetchedData] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");

  const [uploadedFile, setUploadedFile] = useState([]);
  const [loaderDisplay, setLoaderDisplay] = useState("hidden")


  const [successModalDisplay, setSuccessModalDisplay] = useState("hidden")
  const [successMessageStyle, setSuccessMessageStyle] = useState("hidden")
  const [errorMessageStyle, setErrorMessageStyle] = useState("hidden")
  const [errorMessage, setErrorMessage] = useState(<div></div>)




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





  








 

  const todaysDate = new Date();
  const dateOfPosting = todaysDate.toLocaleDateString('en-GB', {date: 'numeric', month: 'long', year: 'numeric'});

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

  const handleChange = (e) => {
    setGadgetForm((gadgetForm) => {
      return { ...gadgetForm, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var postModal = new bootstrap.Modal(document.getElementById("post-new-gadget-modal"))
    postModal.hide()
    document.getElementById("post-new-gadget-modal").style.display = "none";

    setLoaderDisplay("block")
    const uploadedImgs = await handleFileUpload()
   
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

      if (!result.ok) {
        throw new Error('Error posting gadget');
      }

      const resultData = await result.json();


        setLoaderDisplay("hidden")
    
        setSuccessModalDisplay("block")  
        setSuccessMessageStyle("block") 
        setSuccessMessage(`${gadgetForm.brand} - ${gadgetForm.model}`)
        console.log(resultData)
    
          setTimeout(() => {
            setSuccessMessageStyle("hidden") 
    
           window.location.reload()
           
        }, 5000)


    
    } catch (err) {
      setSuccessModalDisplay("block")  
      setErrorMessageStyle("block") 
       setErrorMessage("Error adding new user: " + err.message)
       console.log(err)
       setTimeout(() => {
        setSuccessModalDisplay("hidden")  
      setErrorMessageStyle("hidden") 
       }, 5000);    }
  };

  const handleClosePopup = () => {
    setSuccessModalDisplay("hidden")  
  
  }

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

 <div className={`fixed top-0 left-0 w-screen h-screen  z-40 flex justify-center overflow-hidden items-center ${loaderDisplay}`} style={{background: "white"}}  >    


<div>
<img src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif" className="w-28 h-28 mx-auto" />  <h3 className="text-center mt-5">Posting Your Gadget </h3>
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
            <form className="bg-gradient-to-br from-blue-300 to-slate-300" onSubmit={handleSubmit}>
              <div className="modal-body w-75 mx-auto ">
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
                    maxLength="100"
                     minLength="3"
                    
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
                      maxLength="100"
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
                      maxLength="100"
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
                    placeholder="in $"
                    value={gadgetForm.originalPrice}
                    min="1"
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
                     placeholder="in $"
                     min="1"
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
                      maxLength="1000"
                     minLength="20"
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
                     maxLength="1000"
                     minLength="20"
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
                    maxLength="15"
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
                    min="2"
                    max="50"
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


      <div className={`fixed top-0 left-0 h-screen w-screen bg-transparent flex justify-center items-center success-screen ${successModalDisplay}`}>
         
         <div className=" bg-white flex justify-center items-center shadow-xl shadow-blue-300 rounded-sm" style={{width: '700px', height: '400px'}}>

<div>
<div className={successMessageStyle} >
<div className="flex justify-center"> <img src='https://i.gifer.com/7efs.gif' className="w-60 h-auto" /></div>
<h4 className="text-center">Gadget {successMessage} has been posted Successfully!</h4>
</div>


<div className={errorMessageStyle} >
<div className="flex justify-center"> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRXlrQGWWt5XN3_32f4xtAS0MX9XAe_pCpHw&s' className="w-16 h-auto mb-3" /></div>
<h4 className="text-center w-4/5 mx-auto">{errorMessage}</h4>
</div>

<div className="flex justify-center">
<button className="btn btn-secondary bg-gradient mt-24" onClick={handleClosePopup}>Close</button>
</div>
</div>


</div>

         </div>
    </div>
  );
};

export default AddNewGadget;
