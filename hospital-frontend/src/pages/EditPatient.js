import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import "./AddPatient.css";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: ""
  });

  useEffect(() => {
    API.get(`/patients/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.put(`/patients/${id}`, form)
      .then(() => navigate("/patients"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Patient</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} /><br />
        <input name="age" value={form.age} onChange={handleChange} /><br />
        <input name="gender" value={form.gender} onChange={handleChange} /><br />
        <input name="phone" value={form.phone} onChange={handleChange} /><br />
        <input name="address" value={form.address} onChange={handleChange} /><br />
        <input name="disease" value={form.disease} onChange={handleChange} /><br />

        <button className="submit-button" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPatient;
