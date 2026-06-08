import { useEffect, useState } from "react";
import API from "../api/axios.api";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data } = await API.get("/medicines");
      setMedicines(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="page">Loading medicines...</p>;

  return (
    <div className="page">
      <h2>Medicines</h2>
      <p className="page-subtitle">Browse available medicines and stock details.</p>

      {medicines.length === 0 ? (
        <div className="empty-state">No medicines available.</div>
      ) : (
        medicines.map((med) => (
          <div key={med._id} className="card">
            <h3>{med.name}</h3>
            <p><strong>Company:</strong> {med.company}</p>
            <p><strong>Stock:</strong> {med.stock}</p>
            <p><strong>Price:</strong> ₹{med.price}</p>
            {med.description && <p><strong>Description:</strong> {med.description}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Medicines;