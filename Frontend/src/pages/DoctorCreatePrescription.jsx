import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import API from "../api/axios.api";

const DoctorCreatePrescription = () => {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [form, setForm] = useState({
    patient: "",
    diagnosis: "",
    notes: "",
    medicines: [
      {
        medicineName: "",
        dosage: "",
        timing: "",
        duration: "",
      },
    ],
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/users/");
      const safeData = Array.isArray(data) ? data : [];
      const onlyPatients = safeData.filter((user) => user.role === "patient");
      setPatients(onlyPatients);
    } catch (error) {
      console.log("Fetch patients error:", error);
      toast.error("Failed to fetch patients");
      setPatients([]);
    } finally {
      setLoadingPatients(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (index, e) => {
    const updated = [...form.medicines];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, medicines: updated });
  };

  const addMedicineField = () => {
    setForm({
      ...form,
      medicines: [
        ...form.medicines,
        { medicineName: "", dosage: "", timing: "", duration: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/prescriptions", form);
      toast.success("Prescription created successfully");
      setForm({
        patient: "",
        diagnosis: "",
        notes: "",
        medicines: [
          { medicineName: "", dosage: "", timing: "", duration: "" },
        ],
      });
    } catch (error) {
      console.log("Create prescription error:", error);
      toast.error("Failed to create prescription");
    }
  };

  if (loadingPatients) {
    return <p className="page">Loading patients...</p>;
  }

  return (
    <div className="form-page">
      <h2>Create Prescription</h2>

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
          name="diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
        />

        <h3>Medicines</h3>

        {form.medicines.map((medicine, index) => (
          <div key={index} className="card">
            <input
              name="medicineName"
              value={medicine.medicineName}
              onChange={(e) => handleMedicineChange(index, e)}
              placeholder="Medicine Name"
            />
            <input
              name="dosage"
              value={medicine.dosage}
              onChange={(e) => handleMedicineChange(index, e)}
              placeholder="Dosage"
            />
            <input
              name="timing"
              value={medicine.timing}
              onChange={(e) => handleMedicineChange(index, e)}
              placeholder="Timing"
            />
            <input
              name="duration"
              value={medicine.duration}
              onChange={(e) => handleMedicineChange(index, e)}
              placeholder="Duration"
            />
          </div>
        ))}

        <button type="button" onClick={addMedicineField}>
          Add More Medicine
        </button>

        <button type="submit">Create Prescription</button>
      </form>
    </div>
  );
};

export default DoctorCreatePrescription;
