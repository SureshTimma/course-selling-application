import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-center font-bold py-8 px-6 shadow-md rounded-2xl mx-4 w-full max-w-md">
        <div className="mb-6 text-2xl">Course Selling Application</div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-xl">
          <button onClick={() => navigate("/admin/signup")} className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-orange-100 transition duration-300">
            Admin
          </button>
          <button onClick={() => navigate("/user/signup")} className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-orange-100 transition duration-300">
            User
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
