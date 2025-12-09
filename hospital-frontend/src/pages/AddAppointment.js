import { useState, useEffect } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import "./AddAppointment.css"; // reuse same CSS

function AddAppointment() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "SCHEDULED"
  });

  const [errors, setErrors] = useState({}); // ⭐ error state

  const navigate = useNavigate();

  // Load doctors + patients
  useEffect(() => {
    API.get("/patients").then((res) => setPatients(res.data));
    API.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // ⭐ Patient required
    if (!form.patientId) {
      newErrors.patientId = "Please select a patient";
    }

    // ⭐ Doctor required
    if (!form.doctorId) {
      newErrors.doctorId = "Please select a doctor";
    }

    // ⭐ Date validation (future only, next 10 days)
    const today = new Date();
    const selectedDate = new Date(form.date);

    const next10 = new Date();
    next10.setDate(today.getDate() + 10);

    if (!form.date) {
      newErrors.date = "Please select a valid date";
    } else if (selectedDate <= today) {
      newErrors.date = "Date must be in the future";
    } else if (selectedDate > next10) {
      newErrors.date = "Appointments can only be booked for the next 10 days";
    }

    // ⭐ Time required
    if (!form.time) {
      newErrors.time = "Please select a valid time";
    }

    // ⭐ Status required
    if (!form.status) {
      newErrors.status = "Please select a status";
    }

    setErrors(newErrors);

    // Stop if errors exist
    if (Object.keys(newErrors).length > 0) return;

    // ⭐ If valid → Submit
    API.post("/appointments", form)
      .then(() => navigate("/appointments"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Appointment</h2>

      <form onSubmit={handleSubmit}>

        {/* Patient dropdown */}
        <select name="patientId" onChange={handleChange}>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.patientId && <p className="error-text">{errors.patientId}</p>}

        {/* Doctor dropdown */}
        <select name="doctorId" onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>
          ))}
        </select>
        {errors.doctorId && <p className="error-text">{errors.doctorId}</p>}

        {/* Date */}
        <input
          name="date"
          type="date"
          onChange={handleChange}
        />
        {errors.date && <p className="error-text">{errors.date}</p>}

        {/* Time */}
        <input
          name="time"
          type="time"
          onChange={handleChange}
        />
        {errors.time && <p className="error-text">{errors.time}</p>}

        {/* Status */}
        <select name="status" onChange={handleChange} value={form.status}>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        {errors.status && <p className="error-text">{errors.status}</p>}

        <button className="submit-button" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
