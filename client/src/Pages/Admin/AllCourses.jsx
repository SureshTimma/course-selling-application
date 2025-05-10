import React, { useEffect, useState } from "react";
import CourseCard from "../../Components/CourseCard";
import config from "../../config";

const AllCourses = () => {
  const [coursesData, setCoursesData] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const url = `${config.apiUrl}/admin/course/bulk`;
      const token = localStorage.getItem('adminJWT');
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setCoursesData(data.courses);
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-orange-700 mb-10">Admin Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {coursesData.map((i) => (
          <CourseCard key={i._id} courseItem={i} />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
