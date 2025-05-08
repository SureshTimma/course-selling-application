import React, { use, useState } from "react";

const UserSignin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const url = "http://localhost:3000/user/signin";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFormSubmission = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const fetchData = await fetch(url, options);
    const response = await fetchData.json();
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={onFormSubmission}>
        <h1>User Signin</h1>

        <label htmlFor="email">Email: </label>
        <br />
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        <br />

        <label htmlFor="password">Password: </label>
        <br />
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserSignin;
