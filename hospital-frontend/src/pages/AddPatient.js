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

  const [errors, setErrors] = useState({}); // ⭐ error state

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

    // If any validation errors, STOP
    if (Object.keys(newErrors).length > 0) return;

    // If no errors → proceed
    API.post("/patients", form)
      .then(() => navigate("/patients"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Patient</h2>

      <form onSubmit={handleSubmit}>

        <input name="name" placeholder="Name" onChange={handleChange} />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input name="age" placeholder="Age" onChange={handleChange} />
        {errors.age && <p className="error-text">{errors.age}</p>}

        <input name="gender" placeholder="Gender" onChange={handleChange} />

        <input name="phone" placeholder="Phone" onChange={handleChange} />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <input name="address" placeholder="Address" onChange={handleChange} />

        <input name="disease" placeholder="Disease" onChange={handleChange} />
        {errors.disease && <p className="error-text">{errors.disease}</p>}

        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddPatient;
