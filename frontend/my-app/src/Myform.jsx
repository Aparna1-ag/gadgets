import React, { useState } from 'react'



const MyForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    
    

  })
  

  const myDate = new Date
  const currentTime = myDate.toLocaleDateString() + " " + myDate.toLocaleTimeString()


    const handleSubmit = (e) => {
      e.preventDefault()
      let myurl = "http://localhost:3300/createuser"
      try {
        fetch(myurl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({...formData, date: currentTime})



        })

        console.log("Posted!!" + formData)
      } 
      catch (err) {
        console.log("Error: " + err)
      }
      console.log(formData)
    }


    const handleChange = (e) => {
      setFormData((formData) => {
       return (
        {...formData, [e.target.name]: e.target.value}
       )
      })

    }










  return (
    <div>
      <form className='mx-auto mt-5'  onSubmit={handleSubmit} style={{width: "60%"}}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label ">Name:</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" onChange={handleChange} value={formData.name} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Age:</label>
    <input type="number" className="form-control" id="exampleInputPassword1" name="age" onChange={handleChange} value={formData.age} />
  </div>
  <div className="mb-3">
    <label htmlFor="emaill" className="form-label">Email:</label>
    <input type="email" className="form-control" id="emaill" name="email" onChange={handleChange} value={formData.email} />
  </div>
  <div className="mb-3">
    <label htmlFor="passwordd" className="form-label">Password</label>
    <input type="text" className="form-control" id="passwordd" name="password" onChange={handleChange} value={formData.password}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default MyForm

