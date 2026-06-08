import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">MERN Healthcare Platform</span>

          <h1>Smart Healthcare Management for Patients and Doctors</h1>

          <p>
            MediChain Lite helps doctors manage prescriptions,
            appointments, medical records and medicines in one
            secure digital platform.
          </p>

          <div className="hero-actions">
            {user ? (
              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "doctor"
                    ? "/doctor"
                    : "/patient"
                }
                className="hero-btn primary"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hero-btn primary">
                  Login
                </Link>

                <Link to="/register" className="hero-btn secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-card">
          <h3>Today's Care Overview</h3>

          <div
            className="hero-stat"
            onClick={() => navigate("/doctor/appointments")}
            style={{ cursor: "pointer" }}
          >
            <span>Appointments</span>
            <strong>Manage</strong>
          </div>

          <div
            className="hero-stat"
            onClick={() => navigate("/doctor/create-prescription")}
            style={{ cursor: "pointer" }}
          >
            <span>Prescriptions</span>
            <strong>Create PDF</strong>
          </div>

          <div
            className="hero-stat"
            onClick={() => navigate("/doctor/upload-record")}
            style={{ cursor: "pointer" }}
          >
            <span>Medical Records</span>
            <strong>Upload</strong>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-card">
          <h3>Role Based Access</h3>
          <p>Separate dashboards for Admin, Doctor and Patient.</p>
        </div>

        <div className="feature-card">
          <h3>Digital Prescription</h3>
          <p>Create prescriptions and download them as PDF.</p>
        </div>

        <div className="feature-card">
          <h3>Medical Records</h3>
          <p>Upload and view patient reports securely.</p>
        </div>

        <div className="feature-card">
          <h3>Smart Health Tips</h3>
          <p>Diagnosis based health suggestions.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
