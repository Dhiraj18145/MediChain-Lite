import { useEffect, useState } from "react";
import API from "../api/axios.api";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments");
      setAppointments(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="page">Loading appointments...</p>;

  return (
    <div className="page">
      <h2>Appointments</h2>
      <p className="page-subtitle">Track your scheduled consultations and their current status.</p>

      {appointments.length === 0 ? (
        <div className="empty-state">📅 No appointments yet.
Book your first appointment.</div>
      ) : (
        appointments.map((item) => (
          <div key={item._id} className="card">
            <h3>Appointment Details</h3>
            <p><strong>Date:</strong> {new Date(item.appointmentDate).toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${item.status}`}>
  {item.status}
</span>
            </p>
            <p><strong>Reason:</strong> {item.reason}</p>
            {item.doctor && <p><strong>Doctor:</strong> {item.doctor.name}</p>}
            {item.patient && <p><strong>Patient:</strong> {item.patient.name}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;