import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h2>Patient Dashboard</h2>
      <div className="dashboard-grid">

  <div
    className="dashboard-card"
    onClick={() => navigate("/patient/profile")}
  >
    <h3>Profile</h3>
    <span>Update</span>
  </div>

  <div
    className="dashboard-card"
    onClick={() => navigate("/patient/appointments")}
  >
    <h3>Appointments</h3>
    <span>Check</span>
  </div>

  <div
    className="dashboard-card"
    onClick={() => navigate("/patient/prescriptions")}
  >
    <h3>Prescriptions</h3>
    <span>View</span>
  </div>

  <div
    className="dashboard-card"
    onClick={() => navigate("/patient/records")}
  >
    <h3>Records</h3>
    <span>Access</span>
  </div>

<div className="dashboard-footer">
  <p>
    Monitor patient care, appointments, prescriptions,
    and medical records in one secure place.
  </p>
</div>
      </div>
    </div>
  );
}
export default PatientDashboard;
