import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GetStarted from "./Pages/GetStarted.jsx";
import AdminSignup from "./Pages/Admin/AdminSignup.jsx";
import UserSignup from "./Pages/User/UserSignup.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/user/signup" element={<UserSignup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
