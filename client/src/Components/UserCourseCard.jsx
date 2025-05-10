import React from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const UserCourseCard = ({ courseItem }) => {
  const navigate = useNavigate();
  const { title, desc, price, imageURL, _id, creatorId } = courseItem;
  // console.log(courseItem);

  const url = `${config.apiUrl}/course/purchase`;
  const token = localStorage.getItem('userJWT');
  const handlePurchase = async () => {
    try {
      console.log('Purchasing Course Details:', { courseId: _id, title });
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          courseId: _id,
          courseTitle: title
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // Purchase successful
        alert(data.message || "Course purchased successfully!");
      } else {
        // Purchase failed
        alert(data.message || "Failed to purchase the course.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("An error occurred while purchasing the course.");
    }
  };
  return (
    <div className="max-w-xs w-full bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      <img alt="course-img" src={imageURL} className="w-full h-36 object-cover" />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-orange-600 mb-1">{title}</h1>
        <p className="text-gray-600 text-xs mb-2">{desc}</p>
        <p className="text-base font-bold text-green-600 mb-3">₹{price}</p>
        <button className="w-full bg-orange-600 text-white text-sm font-medium py-1.5 px-3 rounded-md hover:bg-orange-700 transition duration-300" onClick={handlePurchase}>
          Purchase Course
        </button>
      </div>
    </div>
  );
};

export default UserCourseCard;
