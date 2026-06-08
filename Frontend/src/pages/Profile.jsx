import { useEffect, useState } from "react";
import API from "../api/axios.api";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    specialization: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/me");
      setForm({
        name: data.name || "",
        age: data.age || "",
        gender: data.gender || "",
        phone: data.phone || "",
        address: data.address || "",
        specialization: data.specialization || "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/me", form);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="form-page">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <input
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          placeholder="Specialization (for doctor)"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;