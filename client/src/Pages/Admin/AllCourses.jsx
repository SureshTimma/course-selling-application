import React, { useEffect } from "react";
import cookies from "js-cookie";

const AllCourses = () => {
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
    };

    fetchCourses();
  }, []);

  return <div>admin courses</div>;
};

export default AllCourses;
