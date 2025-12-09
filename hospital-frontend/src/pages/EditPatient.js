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

  const [errors, setErrors] = useState({}); // ⭐ error state

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

    let newErrors = {};

    // ⭐ Validations
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (form.age < 0 || form.age > 120) {
      newErrors.age = "Age must be between 0 and 120";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!form.disease.trim()) {
      newErrors.disease = "Disease is required";
    }

    setErrors(newErrors);

    // Stop submission if errors exist
    if (Object.keys(newErrors).length > 0) return;

    // ⭐ Update patient
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
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          name="age"
          value={form.age}
          placeholder="Age"
          onChange={handleChange}
        />
        {errors.age && <p className="error-text">{errors.age}</p>}

        <input
          name="gender"
          value={form.gender}
          placeholder="Gender"
          onChange={handleChange}
        />

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone"
          onChange={handleChange}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <input
          name="address"
          value={form.address}
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          name="disease"
          value={form.disease}
          placeholder="Disease"
          onChange={handleChange}
        />
        {errors.disease && <p className="error-text">{errors.disease}</p>}

        <button className="submit-button" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPatient;
