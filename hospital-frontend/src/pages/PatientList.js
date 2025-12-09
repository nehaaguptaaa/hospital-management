import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/Api";
import "./PatientList.css";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState(""); // ⭐ NEW STATE

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    API.get("/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    API.delete(`/patients/${id}`)
      .then(() => loadPatients())
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Patient List</h2>

      <Link to="/patients/add">
        <button className="add-button">Add Patient</button>
      </Link>

      {/* ⭐ SEARCH BAR */}
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or disease..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Disease</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients
            .filter((p) => {
              const q = search.toLowerCase();

              return (
                p.name.toLowerCase().includes(q) ||
                p.disease.toLowerCase().includes(q)
              );
            })
            .map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.phone}</td>
                <td>{p.disease}</td>

                <td>
                  <Link to={`/patients/edit/${p.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p.id)}
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

export default PatientList;
