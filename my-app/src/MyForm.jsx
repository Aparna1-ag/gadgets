import React, { useState } from 'react'



const MyForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    

  })

  console.log(date.now())

    const handleSubmit = (e) => {
      e.preventDefault()
      let myurl = "http://localhost:3300/createuser"
      try {
        fetch(myurl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({...formData, date: date.now()})



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
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label ">Name:</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" onChange={handleChange} value={formData.name} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Age:</label>
    <input type="number" class="form-control" id="exampleInputPassword1" name="age" onChange={handleChange} value={formData.age} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Email:</label>
    <input type="email" class="form-control" id="exampleInputPassword1" name="email" onChange={handleChange} value={formData.email} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="text" class="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} value={formData.password}/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default MyForm
