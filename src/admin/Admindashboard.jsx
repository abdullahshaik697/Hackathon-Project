// src/pages/Admin/AdminDashboard.jsx
import { useState } from "react";
import Appointments from "./Appointments";
import Userslist from "./Userslist";
import Adminhome from "./Adminhome";
import Helprequests from "./Helprequests";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate()
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-green-800 text-white w-64 min-h-screen p-5 space-y-6 fixed">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => setActiveTab("home")} className=" text-xl text-left hover:text-yellow-300">
            Home
          </button>
          <button onClick={() => setActiveTab("users")} className="text-xl text-left hover:text-yellow-300">
            Total Users List
          </button>
          <button onClick={() => setActiveTab("appointments")} className="text-xl text-left hover:text-yellow-300">
            Appointments
          </button>
          <button onClick={() => setActiveTab("help")} className="text-xl text-left hover:text-yellow-300">
            Help Requests
          </button>
          <button
            onClick={() => {
              navigate("/adminlogin")
            }}
            className="text-xl text-left hover:text-red-400"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="ml-64 p-6 w-full">
        {activeTab === "home" && <Adminhome/>}
        {activeTab === "users" && <Userslist/>}
        {activeTab === "appointments" && <Appointments/>}
        {activeTab === "help" && <Helprequests/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
