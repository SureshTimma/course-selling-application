import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignin = () => {
  const navigate = useNavigate();
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
    navigate("/user/purchases");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200 px-4 py-8">
      <form onSubmit={onFormSubmission} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">User Signin</h1>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <button type="submit" className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg hover:bg-orange-700 transition-all duration-300">
          Submit
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Not registered yet?
          <span onClick={() => navigate("/user/signup")} className="text-orange-600 font-semibold hover:underline ml-1 cursor-pointer">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default UserSignin;
