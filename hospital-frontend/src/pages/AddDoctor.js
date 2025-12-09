import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";
import "./AddPatient.css"; // reuse same CSS styling

function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    qualification: "",
    experience: ""
  });

  const [errors, setErrors] = useState({}); // ⭐ error state

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // ⭐ VALIDATIONS

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!form.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    const exp = Number(form.experience);
    if (isNaN(exp) || exp < 0 || exp > 50) {
      newErrors.experience = "Experience must be between 0 and 50 years";
    }

    setErrors(newErrors);

    // Stop submission if there are errors
    if (Object.keys(newErrors).length > 0) return;

    // ⭐ If everything is valid → submit data
    API.post("/doctors", form)
      .then(() => navigate("/doctors"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Doctor</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
        />
        {errors.specialization && (
          <p className="error-text">{errors.specialization}</p>
        )}

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <input
          name="qualification"
          placeholder="Qualification"
          onChange={handleChange}
        />
        {errors.qualification && (
          <p className="error-text">{errors.qualification}</p>
        )}

        <input
          name="experience"
          placeholder="Experience (Years)"
          onChange={handleChange}
        />
        {errors.experience && (
          <p className="error-text">{errors.experience}</p>
        )}

        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddDoctor;
