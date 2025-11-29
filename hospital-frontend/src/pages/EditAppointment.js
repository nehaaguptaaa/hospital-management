import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import "./AddAppointment.css"; // reuse the same CSS

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "",
  });

  useEffect(() => {
    API.get(`/appointments/${id}`)
      .then((res) => {
        setForm({
          patientId: res.data.patient.id,
          doctorId: res.data.doctor.id,
          date: res.data.date,
          time: res.data.time,
          status: res.data.status,
        });
      })
      .catch((err) => console.log(err));

    API.get("/patients").then((res) => setPatients(res.data));
    API.get("/doctors").then((res) => setDoctors(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.put(`/appointments/${id}`, form)
      .then(() => navigate("/appointments"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Appointment</h2>

      <form onSubmit={handleSubmit}>
        {/* Patient dropdown */}
        <select name="patientId" value={form.patientId} onChange={handleChange}>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <br />

        {/* Doctor dropdown */}
        <select name="doctorId" value={form.doctorId} onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} - {d.specialization}
            </option>
          ))}
        </select>
        <br />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <br />

        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
        />
        <br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="SCHEDULED">Scheduled</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <br />

        <button className="submit-button" type="submit">
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default EditAppointment;
