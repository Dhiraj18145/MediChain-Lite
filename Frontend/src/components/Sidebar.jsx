import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <Link to="/profile">Profile</Link>
      <Link to="/medicines">Medicines</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/records">Records</Link>

      {user.role === "admin" && (
        <>
          <Link to="/admin/users">Manage Users</Link>
          <Link to="/admin/medicines">Manage Medicines</Link>
          <Link to="/prescriptions">Prescriptions</Link>
        </>
      )}

      {user.role === "doctor" && (
        <>
          <Link to="/prescriptions">Prescriptions</Link>

          <Link to="/doctor/create-prescription">
            Create Prescription
          </Link>

          <Link to="/doctor/upload-record">
            Upload Record
          </Link>

          <Link to="/doctor/appointments">
            Manage Appointments
          </Link>
        </>
      )}

      {user.role === "patient" && (
        <>
          <Link to="/prescriptions">Prescriptions</Link>

          <Link to="/patient/appointment/request">
            Request Appointment
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
