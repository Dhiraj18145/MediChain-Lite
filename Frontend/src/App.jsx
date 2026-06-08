import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

import Medicines from "./pages/Medicines";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescription";
import Records from "./pages/Records";
import Profile from "./pages/Profile";

import AdminUsers from "./pages/AdminUsers";
import AdminMedicines from "./pages/AdminMedicines";

import DoctorCreatePrescription from "./pages/DoctorCreatePrescription";
import DoctorUploadRecord from "./pages/DoctorUploadRecord";
import DoctorAppointments from "./pages/DoctorAppointments";

import PatientRequestAppointment from "./pages/PatientRequestAppointment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main-content">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute role="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/medicines"
              element={
                <ProtectedRoute role="admin">
                  <AdminMedicines />
                </ProtectedRoute>
              }
            />

            {/* Doctor */}
            <Route
              path="/doctor"
              element={
                <ProtectedRoute role="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/create-prescription"
              element={
                <ProtectedRoute role="doctor">
                  <DoctorCreatePrescription />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/upload-record"
              element={
                <ProtectedRoute role="doctor">
                  <DoctorUploadRecord />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute role="doctor">
                  <DoctorAppointments />
                </ProtectedRoute>
              }
            />

            {/* Patient */}
            <Route
              path="/patient"
              element={
                <ProtectedRoute role="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/patient/appointment/request"
              element={
                <ProtectedRoute role="patient">
                  <PatientRequestAppointment />
                </ProtectedRoute>
              }
            />

            {/* Shared Pages */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/medicines"
              element={
                <ProtectedRoute>
                  <Medicines />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/patients"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/prescriptions"
              element={
                <ProtectedRoute>
                  <Prescriptions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/records"
              element={
                <ProtectedRoute>
                  <Records />
                </ProtectedRoute>
              }
            />

            <Route
  path="/appointments"
  element={
    <ProtectedRoute>
      <Appointments />
    </ProtectedRoute>
  }
/>

          </Routes>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;