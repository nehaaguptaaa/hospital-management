import { useEffect, useState } from "react";
import API from "../services/Api";
import { Link } from "react-router-dom";
import "./PatientList.css";

function PatientList() {
  const [search, setSearch] = useState("");

  const [patients, setPatients] = useState([]);

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
  
  {/* search box */}
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
            <th>Actions</th> {/* 👈 NEW */}
          </tr>
        </thead>


        
        <tbody>
          
  {patients
    .filter((p) => {
      const query = search.toLowerCase();

      return (
        p.name.toLowerCase().includes(query) ||
        p.disease.toLowerCase().includes(query)
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
          {/* Edit + Delete buttons */}
          
        </td>
      </tr>
    ))}
</tbody>

       
      </table>
    </div>
  );
}

export default PatientList;
