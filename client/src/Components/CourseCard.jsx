import React from "react";

const CourseCard = ({ courseItem }) => {
  const { title, desc, price, imageURL } = courseItem;
  console.log(courseItem);
  return (
    <div>
      <h1>{title}</h1>
      <p>{desc}</p>
      <p>{price}</p>
      <img alt="course-img" src={imageURL} />
    </div>
  );
};

export default CourseCard;
