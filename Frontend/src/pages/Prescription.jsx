import { useEffect, useState } from "react";
import API from "../api/axios.api";
import html2pdf from "html2pdf.js";

const getHealthTip = (diagnosis) => {
  if (!diagnosis) return "Follow your doctor's advice carefully.";

  const text = diagnosis.toLowerCase();

  if (text.includes("fever")) {
    return "AI Suggestion: Drink plenty of fluids, take proper rest, monitor temperature, and avoid cold food.";
  }

  if (text.includes("cold") || text.includes("cough")) {
    return "AI Suggestion: Stay warm, drink warm water, avoid cold drinks, and take steam inhalation if needed.";
  }

  if (text.includes("headache")) {
    return "AI Suggestion: Stay hydrated, reduce screen time, take proper sleep, and avoid stress.";
  }

  if (text.includes("diabetes")) {
    return "AI Suggestion: Maintain a balanced diet, monitor sugar levels, and follow medication regularly.";
  }

  if (text.includes("bp") || text.includes("blood pressure")) {
    return "AI Suggestion: Reduce salt intake, avoid stress, walk daily, and monitor blood pressure.";
  }

  return "AI Suggestion: Maintain hydration, take medicines on time, and follow doctor's instructions.";
};

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await API.get("/prescriptions");
      setPrescriptions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (id) => {
    const element = document.getElementById(`prescription-${id}`);

    if (!element) {
      toast.error("Prescription not found");
      return;
    }

    const options = {
      margin: 0.5,
      filename: `prescription-${id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  if (loading) {
    return <p className="page">Loading prescriptions...</p>;
  }

  return (
    <div className="page">
      <h2>Prescriptions</h2>
      <p className="page-subtitle">
        Review diagnosis, medication plan, and treatment notes.
      </p>

      {prescriptions.length === 0 ? (
        <div className="empty-state">No prescriptions found.</div>
      ) : (
        prescriptions.map((item) => (
          <div
            className="card"
            id={`prescription-${item._id}`}
            key={item._id}
          >
            <h3>Diagnosis: {item.diagnosis}</h3>

            <p>
              <strong>Notes:</strong> {item.notes || "No notes added"}
            </p>

            {item.patient && (
              <p>
                <strong>Patient:</strong> {item.patient.name}
              </p>
            )}

            {item.doctor && (
              <p>
                <strong>Doctor:</strong> {item.doctor.name}
              </p>
            )}

            <div className="info-row">
              <span className="tag">Medical Prescription</span>
              <span className="tag">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "No date"}
              </span>
            </div>

            <h4 style={{ marginTop: "18px", marginBottom: "10px" }}>
              Medicines
            </h4>

            {item.medicines?.length > 0 ? (
              <ul className="medicine-list">
                {item.medicines.map((med, index) => (
                  <li key={index}>
                    {med.medicineName} - {med.dosage} - {med.timing} -{" "}
                    {med.duration}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">No medicines added.</div>
            )}

            <p>
              <strong>Health Tip:</strong> {getHealthTip(item.diagnosis)}
            </p>

            <button
              onClick={() => downloadPDF(item._id)}
              className="btn-download"
            >
              Download PDF
            </button>
          </div>
        ))
      )}
      {/* <div className="ai-box">
  <strong>🤖 Smart AI Suggestion:</strong>
  <p>{getAISuggestion(item.diagnosis)}</p>
</div> */}
    </div>
  );
};

export default Prescriptions;
