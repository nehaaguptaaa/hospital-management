import { useState, useEffect } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

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

    API.post("/appointments", form)
      .then(() => navigate("/appointments"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Appointment</h2>

      <form onSubmit={handleSubmit}>

        {/* Patient dropdown */}
        <select name="patientId" onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select> <br />

        {/* Doctor dropdown */}
        <select name="doctorId" onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>
          ))}
        </select> <br />

        <input name="date" type="date" onChange={handleChange} /> <br />
        <input name="time" type="time" onChange={handleChange} /> <br />

        <select name="status" onChange={handleChange}>
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select> <br />

        <button type="submit">Save</button>
      </form>

    </div>
  );
}

export default AddAppointment;
