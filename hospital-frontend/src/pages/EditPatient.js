import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import "./AddPatient.css"; // reuse same styling

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: "",
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
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <br />
        <input
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
        />
        <br />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <br />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <br />
        <input
          name="disease"
          placeholder="Disease"
          value={form.disease}
          onChange={handleChange}
        />
        <br />

        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPatient;
