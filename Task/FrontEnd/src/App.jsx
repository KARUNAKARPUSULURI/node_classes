import React from 'react'
import { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    username : "",
    email : "",
    password :"",
    image : ""
  })
  const handleChange = (e) => {
    const {name, value, files} = e.target;
    setFormData((prev) => ({
      ...prev, [name] : files ? files[0] : value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    const data = new FormData()
    data.append("username", formData.username)
    data.append("email", formData.email)
    data.append("password", formData.password )
    data.append("image", formData.image)
    fetch(url, {
      method : "post",
      body : data
    })

  }
  return (
    <div>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label htmlFor='username'>Name : </label>
        <input type='text' placeholder='enter username' name='username' id='username' onChange={handleChange} /><br />
        <label htmlFor='email'>Email : </label>
        <input type='email' placeholder='enter email' name='email' id='email' onChange={handleChange} /><br />
        <label htmlFor='password'>Password : </label>
        <input type='password' placeholder='enter password' name='password' id='password' onChange={handleChange} /><br />
        <label htmlFor='image'>Photo : </label>
        <input type='file' name='image' id='image' onChange={handleChange} /><br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App