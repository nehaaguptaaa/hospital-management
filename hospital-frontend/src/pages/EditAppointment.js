import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";

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

  const [errors, setErrors] = useState({});

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

    let newErrors = {};

    if (!form.patientId) newErrors.patientId = "Please select a patient";
    if (!form.doctorId) newErrors.doctorId = "Please select a doctor";

    const today = new Date();
    const selectedDate = new Date(form.date);
    const next10 = new Date();
    next10.setDate(today.getDate() + 10);

    if (!form.date) {
      newErrors.date = "Please select a date";
    } else if (selectedDate <= today) {
      newErrors.date = "Date must be in the future";
    } else if (selectedDate > next10) {
      newErrors.date = "Must be within 10 days";
    }

    if (!form.time) newErrors.time = "Please select a time";
    if (!form.status) newErrors.status = "Please select a status";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    API.put(`/appointments/${id}`, form)
      .then(() => navigate("/appointments"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h4 className="mb-0 text-dark">Edit Appointment</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* Patient */}
            <div className="mb-3">
              <label className="form-label">Patient</label>
              <select
                name="patientId"
                className="form-select"
                value={form.patientId}
                onChange={handleChange}
              >
                <option value="">Select Patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.patientId && <div className="text-danger">{errors.patientId}</div>}
            </div>

            {/* Doctor */}
            <div className="mb-3">
              <label className="form-label">Doctor</label>
              <select
                name="doctorId"
                className="form-select"
                value={form.doctorId}
                onChange={handleChange}
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} - {d.specialization}
                  </option>
                ))}
              </select>
              {errors.doctorId && <div className="text-danger">{errors.doctorId}</div>}
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
              />
              {errors.date && <div className="text-danger">{errors.date}</div>}
            </div>

            {/* Time */}
            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                name="time"
                className="form-control"
                value={form.time}
                onChange={handleChange}
              />
              {errors.time && <div className="text-danger">{errors.time}</div>}
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              {errors.status && <div className="text-danger">{errors.status}</div>}
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Update Appointment
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAppointment;
