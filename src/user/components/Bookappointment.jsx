import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/config";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const Bookappointment = () => {
  const [name, setName] = useState("Loading...");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [dateTime, setDateTime] = useState("");

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // get phone from auth
        if (user.phoneNumber) {
          setPhone(user.phoneNumber);
        }

        // get displayName from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setName(userData.displayName || "User");
        } else {
          setName("User");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason || !dateTime || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        userId: user.uid, // 👈 this links the appointment to logged-in user
        name,
        email: user?.email || "No Email",
        phone,
        reason,
        dateTime,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("✅ Appointment submitted successfully!");
      setReason("");
      setDateTime("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit appointment.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-16 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} disabled className="w-full p-2 border rounded bg-gray-100" />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Phone Number"
        />
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Reason"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Bookappointment;
