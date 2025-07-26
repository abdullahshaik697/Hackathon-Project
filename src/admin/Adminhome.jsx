import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Adminhome = () => {
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [helpCount, setHelpCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const appSnap = await getDocs(collection(db, "appointments"));
      const helpSnap = await getDocs(collection(db, "helpRequests"));

      setUserCount(usersSnap.size);
      setAppointmentCount(appSnap.size);
      setHelpCount(helpSnap.size);
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6 ml-34">
      <h2 className="text-3xl font-bold mb-6">Dashboard Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-700">{userCount}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-700">Appointments</h3>
          <p className="text-3xl font-bold text-green-600">{appointmentCount}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-700">Help Requests</h3>
          <p className="text-3xl font-bold text-red-500">{helpCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
