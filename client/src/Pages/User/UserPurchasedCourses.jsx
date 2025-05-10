import React, { useEffect, useState } from "react";
import PurchasedCourseCard from "../../Components/PurchasedCourseCard";
import config from "../../config";
import UserNavbar from '../../Components/UserNavbar';

const UserPurchasedCourses = () => {
  const [coursesData, setCoursesData] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const url = `${config.apiUrl}/course/my-courses`;
      const token = localStorage.getItem('userJWT');
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('Purchased Courses:', data);
        setCoursesData(data.courses);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setCoursesData([]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-orange-700 mb-10">User Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {coursesData.map((i) => (
            <PurchasedCourseCard key={i._id} courseItem={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPurchasedCourses;
