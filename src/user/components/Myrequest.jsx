import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Myrequest = () => {
  const [appointments, setAppointments] = useState([]);
  const [helpRequests, setHelpRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        try {
          // Fetch Appointments
          const appointmentRef = collection(db, "appointments");
          const appointmentQuery = query(appointmentRef, where("userId", "==", user.uid));
          const appointmentSnapshot = await getDocs(appointmentQuery);
          const appointmentData = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAppointments(appointmentData);

          // Fetch Help Requests
          const helpRef = collection(db, "helpRequests");
          const helpQuery = query(helpRef, where("userId", "==", user.uid));
          const helpSnapshot = await getDocs(helpQuery);
          const helpData = helpSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHelpRequests(helpData);

        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  return (
    <div className="max-w-3xl mb-16 mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">My Requests</h2>

      <div>
        <h3 className="text-xl font-semibold mb-2">Appointments</h3>
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          appointments.map(app => (
            <div key={app.id} className="border p-4 rounded mb-3 shadow">
              <p><strong>Reason:</strong> {app.reason}</p>
              <p><strong>Date & Time:</strong> {app.dateTime}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{app.status}</span></p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Help Requests</h3>
        {helpRequests.length === 0 ? (
          <p className="text-gray-600">No help requests found.</p>
        ) : (
          helpRequests.map(help => (
            <div key={help.id} className="border p-4 rounded mb-3 shadow">
              <p><strong>Type:</strong> {help.type}</p>
              <p><strong>Description:</strong> {help.description}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{help.status}</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Myrequest;
