import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GetStarted from "./Pages/GetStarted.jsx";
import AdminSignup from "./Pages/Admin/AdminSignup.jsx";
import AdminSignin from "./Pages/Admin/AdminSignin.jsx";
import UserSignup from "./Pages/User/UserSignup.jsx";
import UserSignin from "./Pages/User/UserSignin.jsx";
import UserPurchases from "./Pages/User/UserPurchases.jsx";

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
          <Route path="/user/purchases" element={<UserPurchases />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
