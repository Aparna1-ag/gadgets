import React, { useEffect, useState } from "react";
import img1 from "./assets/gadgets_image.png";
import img2 from "./assets/custom_bg.png";
// import { gadgetData } from './gadgetData'
import { Link } from "react-router";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";


const AddNewGadget = () => {

    const navigate = useNavigate()
  

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



    const todaysDate = new Date();
    const dateOfPosting = todaysDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric' });

    const handleFileChange = (e) => {
        const images = [...e.target.files];
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



    const handleChange = (e) => {
        setGadgetForm((gadgetForm) => {
            return { ...gadgetForm, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

 

        setLoaderDisplay("block")
        const uploadedImgs = await handleFileUpload()

        console.log(uploadedImgs)


        let myUrl = "https://ultimategadgeting.onrender.com/allgadgets";
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

                navigate('/')

            }, 3000)



        } catch (err) {
            setSuccessModalDisplay("block")
            setErrorMessageStyle("block")
            setErrorMessage("Error adding new gadget: " + err.message)
            console.log(err)
            setTimeout(() => {
                setSuccessModalDisplay("hidden")
                setErrorMessageStyle("hidden")
            }, 5000);
        }
    };

    const handleClosePopup = () => {
        setSuccessModalDisplay("hidden")

    }





    return (
        <div>
            <Navbar />

            <div className={`fixed top-0 left-0 w-screen h-screen  z-40 flex justify-center overflow-hidden items-center ${loaderDisplay}`} style={{ background: "white" }}  >


                <div>
                    <img src="https://i.pinimg.com/originals/3e/f0/e6/3ef0e69f3c889c1307330c36a501eb12.gif" className="w-28 h-28 mx-auto" />  <h3 className="text-center mt-5">Posting Your Gadget </h3>
                </div>
            </div>


         <div className="bg-gradient-to-br sm:h-screen lg:h-full from-blue-300 to-slate-300 w-screen ">
         <div className="pt-32 bg-gradient-to-br from-blue-300 to-slate-300  w-5/6 lg:w-2/3 mx-auto pb-20">
                <form  onSubmit={handleSubmit}>
                    <div className=" row ">
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Gadget Name:
                            </label>
                            <input
                                type="text"
                                className="form-control "
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
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Brand:
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="brand"
                                value={gadgetForm.brand}
                                maxLength="100"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Model:
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="model"
                                value={gadgetForm.model}
                                onChange={handleChange}
                                maxLength="100"
                                required
                            />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Original Price:
                            </label>
                            <input
                                type="number"
                                className="form-control "
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
                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Resale Price:
                            </label>
                            <input
                                type="number"
                                className="form-control "
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

                        <div className="mb-3 col-6">
                            <label htmlFor="exampleInputEmail1" className="form-label ">
                                Purchase Date:
                            </label>
                            <input
                                type="date"
                                className="form-control "
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

                        <div className="mb-3 col-sm-12 col-md-4">
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
                        <div className="mb-3 col-sm-12 col-md-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Contact:
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

                        <div className="mb-3 col-sm-12 col-md-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Name:
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
                    <div className="mt-8 w-36 flex justify-between">
                        <button
                            type="submit"
                            className="btn btn-success bg-gradient mr-4"
                            style={{ background: "" }}
                        >
                            Post
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary bg-gradient ml-4"
                            onClick={() => {navigate('/')}}
                            style={{ background: "#192035" }}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
         </div>







            <div className={`fixed top-0 left-0 h-screen w-screen flex justify-center items-center success-screen ${successModalDisplay}`}>

                <div className=" bg-white flex justify-center items-center shadow-xl shadow-blue-300 rounded-sm" style={{ width: '700px', height: '400px' }}>

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
                            <button className="btn btn-secondary bg-gradient mt-6" onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default AddNewGadget;
