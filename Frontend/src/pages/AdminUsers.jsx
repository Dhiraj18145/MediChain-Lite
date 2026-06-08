import { useEffect, useState } from "react";
import API from "../api/axios.api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch users");
    }
  };

  return (
    <div className="page">
      <h2>All Users</h2>
      {users.map((user) => (
        <div key={user._id} className="card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Phone: {user.phone || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;