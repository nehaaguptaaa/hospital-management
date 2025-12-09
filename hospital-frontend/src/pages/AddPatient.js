import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import "./AddPatient.css";

function AddPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/patients", form)
      .then(() => navigate("/patients"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Patient</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="age" placeholder="Age" onChange={handleChange} /><br />
        <input name="gender" placeholder="Gender" onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
        <input name="address" placeholder="Address" onChange={handleChange} /><br />
        <input name="disease" placeholder="Disease" onChange={handleChange} /><br />

        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddPatient;
