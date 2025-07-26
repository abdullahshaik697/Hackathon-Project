import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Myprofile = () => {
  const [name, setName] = useState("Loading...");
  const [email, setEmail] = useState("Loading...");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          console.log("User not logged in");
          return;
        }

        const userRef = doc(db, 'users', userId); // ✅ correct path
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.displayName);
          setEmail(userData.email);
        } else {
          setName("No Name Found");
          setEmail("No Email Found");
          console.log("No such user found");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-green-800">My Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="text-lg text-gray-900 font-semibold">{name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="text-lg text-gray-900 font-semibold">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
