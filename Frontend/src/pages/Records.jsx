import { useEffect, useState } from "react";
import API from "../api/axios.api";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data } = await API.get("/records");
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="page">Loading medical records...</p>;

  return (
    <div className="page">
      <h2>Medical Records</h2>
      <p className="page-subtitle">Access uploaded reports, files, and treatment documents.</p>

      {records.length === 0 ? (
        <div className="empty-state">No records found.</div>
      ) : (
        records.map((record) => (
          <div key={record._id} className="card">
            <h3>{record.title}</h3>
            <p>{record.description}</p>
            {record.patient && <p><strong>Patient:</strong> {record.patient.name}</p>}
            {record.doctor && <p><strong>Doctor:</strong> {record.doctor.name}</p>}

            {record.file && (
              <a
                className="file-link"
                href={`http://localhost:5000/uploads/${record.file}`}
                target="_blank"
                rel="noreferrer"
              >
                View Uploaded File
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Records;