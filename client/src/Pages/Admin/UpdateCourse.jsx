import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import config from "../../config";

const UpdateCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseData = location.state?.courseData;
  const [formData, setFormData] = useState({
    title: courseData.title,
    desc: courseData.desc,
    price: courseData.price,
    imageURL: courseData.imageURL,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(courseData._id);

  const url = `${config.apiUrl}/admin/course`;
  //   console.log(cookies.get("adminJWT"));
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("adminJWT")}`,
      "X-CourseId": courseData._id,
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
    navigate("/admin/all-courses");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Update Course</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Course Name:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              id="desc"
              name="desc"
              rows="4"
              value={formData.desc}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">
              Image URL:
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <button type="submit" className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition duration-300">
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
