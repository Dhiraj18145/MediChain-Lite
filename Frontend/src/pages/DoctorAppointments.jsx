import { useEffect, useState } from "react";
import API from "../api/axios.api";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments");
      setAppointments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.log(error);
    toast.error("Failed to update appointment status");
    }
  };

  return (
    <div className="page">
      <h2>Manage Appointments</h2>
      {appointments.map((item) => (
        <div key={item._id} className="card">
          <p><strong>Patient:</strong> {item.patient?.name}</p>
          <p><strong>Date:</strong> {new Date(item.appointmentDate).toLocaleString()}</p>
          <p><strong>Reason:</strong> {item.reason}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => updateStatus(item._id, "approved")}>Approve</button>
            <button onClick={() => updateStatus(item._id, "rejected")}>Reject</button>
            <button onClick={() => updateStatus(item._id, "completed")}>Complete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorAppointments;