import { useEffect, useState } from "react";
import API from "../api/axios.api";

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    company: "",
    stock: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data } = await API.get("/medicines");
      setMedicines(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/medicines", form);
      setForm({ name: "", company: "", stock: "", price: "", description: "" });
      fetchMedicines();
      alert("Medicine added successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add medicine");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/medicines/${id}`);
      fetchMedicines();
    } catch (error) {
      console.log(error);
      alert("Failed to delete medicine");
    }
  };

  return (
    <div className="page">
      <h2>Manage Medicines</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Medicine Name" />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add Medicine</button>
      </form>

      {medicines.map((med) => (
        <div key={med._id} className="card">
          <h3>{med.name}</h3>
          <p>Company: {med.company}</p>
          <p>Stock: {med.stock}</p>
          <p>Price: ₹{med.price}</p>
          <button onClick={() => handleDelete(med._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminMedicines;