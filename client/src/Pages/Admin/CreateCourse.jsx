import React, { useState } from "react";
import cookies from "js-cookie";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    price: 0,
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const url = "http://localhost:3000/admin/course";
  //   console.log(cookies.get("adminJWT"));
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("adminJWT")}`,
    },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);
  };

  return (
    <div>
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Course Name:</label>
        <br />
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        <br />
        <label htmlFor="desc">Description:</label>
        <br />
        <textarea id="desc" name="desc" value={formData.desc} rows="4" cols="50" onChange={handleChange}></textarea>
        <br />
        <label htmlFor="price">Price:</label>
        <br />
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
        <br />
        <label htmlFor="imageURL">Image URL:</label>
        <br />
        <input type="text" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleChange} />

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
