import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GetStarted from "./Pages/GetStarted.jsx";
import AdminSignup from "./Pages/Admin/AdminSignup.jsx";
import AdminSignin from "./Pages/Admin/AdminSignin.jsx";
import UserSignup from "./Pages/User/UserSignup.jsx";
import UserSignin from "./Pages/User/UserSignin.jsx";
import CreateCourse from "./Pages/Admin/CreateCourse.jsx";
import AdminCourses from "./Pages/Admin/AllCourses.jsx";
import UpdateCourse from "./Pages/Admin/UpdateCourse.jsx";
import UserCourses from "./Pages/User/AllCourses.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/signin" element={<UserSignin />} />
          <Route path="/admin/create-course" element={<CreateCourse />} />
          <Route path="/admin/all-courses" element={<AdminCourses />} />
          <Route path="/admin/update-course" element={<UpdateCourse />} />
          <Route path="/user/all-courses/" element={<UserCourses />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
