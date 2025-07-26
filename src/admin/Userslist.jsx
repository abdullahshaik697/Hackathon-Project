import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const Userslist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      const list = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(list);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 ml-34">
      <h2 className="text-2xl font-bold mb-4">Total Users</h2>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            {/* <th className="p-2">Phone</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.displayName}</td>
              <td className="p-2">{user.email}</td>
              {/* <td className="p-2">{user.phone}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && <p className="text-gray-500 text-center mt-4">No users found.</p>}
    </div>
  );
};

export default Userslist;