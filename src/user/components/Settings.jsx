import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Settings</h1>
      
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
