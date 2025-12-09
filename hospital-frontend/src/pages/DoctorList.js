import { useEffect, useState } from "react";
import API from "../services/Api";
import { Link } from "react-router-dom";
import "./DoctorList.css";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState(""); // ⭐ NEW

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    API.delete(`/doctors/${id}`)
      .then(() => loadDoctors())
      .catch((err) => console.log(err));
  };

  // ⭐ Extract all unique specializations from doctors
  const uniqueSpecializations = [
    "All",
    ...new Set(doctors.map((d) => d.specialization)),
  ];

  return (
    <div className="table-container">
      <h2 className="table-title">Doctor List</h2>

      <Link to="/doctors/add">
        <button className="add-button">Add Doctor</button>
      </Link>

      {/* ⭐ SPECIALIZATION FILTER */}
      <select
        className="filter-select"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      >
        {uniqueSpecializations.map((spec, index) => (
          <option key={index} value={spec === "All" ? "" : spec}>
            {spec}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors
            .filter((d) =>
              specialization === ""
                ? true
                : d.specialization === specialization
            )
            .map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>{d.phone}</td>
                <td>{d.qualification}</td>
                <td>{d.experience}</td>
                <td>
                  <Link to={`/doctors/edit/${d.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(d.id)}
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

export default DoctorList;
