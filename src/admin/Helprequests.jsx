
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const Helprequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "helpRequests"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRequests(data);
  };

  const handleStatusChange = async (id, newStatus) => {
    const docRef = doc(db, "helpRequests", id);
    await updateDoc(docRef, { status: newStatus });
    fetchRequests(); // Refresh list
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Help Requests</h2>
      <table className="w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.phone}</td>
              <td className="p-2 border">{item.type}</td>
              <td className="p-2 border">{item.description}</td>
              <td className="p-2 border text-blue-600">{item.status}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleStatusChange(item.id, "Approved")}
                  className="text-white bg-green-500 px-2 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(item.id, "Rejected")}
                  className="text-white bg-red-500 px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Helprequests;
