import { useEffect, useState } from "react";
import API from "../api/axios.api";

const PatientRequestAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: "",
    appointmentDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/users");
      const onlyDoctors = data.filter((user) => user.role === "doctor");
      setDoctors(onlyDoctors);
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
      await API.post("/appointments", form);
      toast.success("Appointment requested successfully");
      setForm({ doctor: "", appointmentDate: "", reason: "" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to request appointment");
    }
  };

  return (
    <div className="form-page">
      <h2>Request Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select name="doctor" value={form.doctor} onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} - {doctor.email}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
        />

        <textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" />
        <button type="submit">Request Appointment</button>
      </form>
    </div>
  );
};

export default PatientRequestAppointment;
