import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../api/axios.api";

const DoctorUploadRecord = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patient: "",
    title: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/users");
      const safeData = Array.isArray(data) ? data : [];
      const onlyPatients = safeData.filter((user) => user.role === "patient");
      setPatients(onlyPatients);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch patients");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setForm({ ...form, file: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patient || !form.title || !form.description || !form.file) {
      alert("Please fill all fields and choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("patient", form.patient);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("file", form.file);

    try {
      await API.post("/records/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Record uploaded successfully");

      setForm({
        patient: "",
        title: "",
        description: "",
        file: null,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload record");
    }
  };

  return (
    <div className="form-page">
      <h2>Upload Medical Record</h2>
      <p className="page-subtitle">Upload reports, scan files, and supporting treatment documents.</p>

      <form onSubmit={handleSubmit}>
        <select name="patient" value={form.patient} onChange={handleChange}>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name} - {patient.email}
            </option>
          ))}
        </select>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Record Title"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input type="file" name="file" onChange={handleChange} />

        <button type="submit">Upload Record</button>
      </form>
    </div>
  );
};

export default DoctorUploadRecord;
