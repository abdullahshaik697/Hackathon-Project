import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(data);
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const docRef = doc(db, "appointments", id);
      await updateDoc(docRef, { status: newStatus });
      fetchAppointments(); // Refresh list after update
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Appointments List
      </h2>
      <table className="w-full text-sm text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Reason</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Time</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => {
            const dateObj = item.dateTime ? new Date(item.dateTime) : null;
            const dateStr = dateObj ? dateObj.toLocaleDateString() : "-";
            const timeStr = dateObj
              ? dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-";

            return (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="p-3 border">{item.name || "-"}</td>
                <td className="p-3 border">{item.phone || "-"}</td>
                <td className="p-3 border">{item.reason || "-"}</td>
                <td className="p-3 border">{dateStr}</td>
                <td className="p-3 border">{timeStr}</td>
                <td className="p-3 border font-medium text-blue-600">
                  {item.status || "Pending"}
                </td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => handleStatusChange(item.id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(item.id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
