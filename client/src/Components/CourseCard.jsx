import React from "react";

const CourseCard = ({ courseItem }) => {
  const { title, desc, price, imageURL } = courseItem;
  console.log(courseItem);
  return (
    <div className="max-w-xs w-full bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      <img alt="course-img" src={imageURL} className="w-full h-36 object-cover" />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-orange-600 mb-1">{title}</h1>
        <p className="text-gray-600 text-xs mb-2">{desc}</p>
        <p className="text-base font-bold text-green-600 mb-3">₹{price}</p>
        <button className="w-full bg-orange-600 text-white text-sm font-medium py-1.5 px-3 rounded-md hover:bg-orange-700 transition duration-300">Enroll</button>
      </div>
    </div>
  );
};

export default CourseCard;
