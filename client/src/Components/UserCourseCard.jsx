import React from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

const UserCourseCard = ({ courseItem }) => {
  const navigate = useNavigate();
  const { title, desc, price, imageURL, _id, creatorId } = courseItem;
  // console.log(courseItem);

  const url = "http://localhost:3000/course/purchase";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("userJWT")}`,
      "X-courseId": _id,
    },
  };
  const handlePurchase = async () => {
    console.log("purchase clicked");
    // navigate("/admin/update-course", {
    //   state: {
    //     courseData: courseItem,
    //   },
    // });

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
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
