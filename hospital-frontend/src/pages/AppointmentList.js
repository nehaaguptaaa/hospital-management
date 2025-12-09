import { useEffect, useState } from "react";
import API from "../services/Api";
import { Link } from "react-router-dom";
import "./AppointmentList.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");     // ⭐ NEW
  const [dateFilter, setDateFilter] = useState("");         // ⭐ NEW

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    API.get("/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    API.delete(`/appointments/${id}`)
      .then(() => loadAppointments())
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Appointment List</h2>

      <Link to="/appointments/add">
        <button className="add-button">Add Appointment</button>
      </Link>

      {/* ⭐ STATUS FILTER */}
      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="SCHEDULED">Scheduled</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      {/* ⭐ DATE FILTER */}
      <input
        type="date"
        className="date-filter"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments
            // ⭐ APPLY FILTERS
            .filter((a) => {
              const matchStatus =
                statusFilter === "" ? true : a.status === statusFilter;

              const matchDate =
                dateFilter === "" ? true : a.date === dateFilter;

              return matchStatus && matchDate;
            })
            .map((a) => (
              <tr key={a.id}>
                <td>{a.patient?.name}</td>
                <td>{a.doctor?.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.status}</td>

                <td>
                  <Link to={`/appointments/edit/${a.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="delete-btn"
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
