import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>Doctor Dashboard</h2>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/doctor/create-prescription")}
        >
          <h3>Prescriptions</h3>
          <span>Create</span>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/doctor/upload-record")}
        >
          <h3>Records</h3>
          <span>Upload</span>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/doctor/appointments")}
        >
          <h3>Appointments</h3>
          <span>Manage</span>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/doctor/patients")}
        >
          <h3>Patients</h3>
          <span>View</span>
        </div>

      </div>

      <div className="dashboard-footer">
  <p>
    Monitor patient care, appointments, prescriptions,
    and medical records in one secure place.
  </p>
</div>

    </div>
  );
};

export default DoctorDashboard;