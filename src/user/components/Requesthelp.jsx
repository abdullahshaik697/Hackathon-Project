import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const Requesthelp = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("Loading...");
  const [phone, setPhone] = useState("Not Provided");
  const [helpType, setHelpType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.phoneNumber) {
          setPhone(currentUser.phoneNumber);
        }

        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setName(userDocSnap.data().displayName || "No Name");
        } else {
          setName("No Name");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!helpType || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "helpRequests"), {
        userId: user?.uid || "unknown",
        name,
        phone,
        type: helpType,
        description,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("Help request submitted successfully!");
      setHelpType("");
      setDescription("");
    } catch (err) {
      console.error("Error adding help request:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-xl mb-16 mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Request Help</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Type of Help</label>
          <select
            className="w-full border rounded p-2"
            value={helpType}
            onChange={(e) => setHelpType(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            placeholder="Describe your situation"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default Requesthelp;
