import React, { useEffect, useState } from "react";
import cookies from "js-cookie";
import CourseCard from "../../Components/CourseCard";

const AllCourses = () => {
  const [coursesData, setCoursesData] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const url = "http://localhost:3000/admin/course/bulk";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("adminJWT")}`,
        },
        Credentials: "include",
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setCoursesData(data.courses);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      admin courses
      {coursesData.map((i) => (
        <CourseCard key={i._id} courseItem={i} />
      ))}
    </div>
  );
};

export default AllCourses;
