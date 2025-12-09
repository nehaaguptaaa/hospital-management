import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import "./AddPatient.css"; // using same CSS styling

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    qualification: "",
    experience: ""
  });

  const [errors, setErrors] = useState({}); // ⭐ error state

  useEffect(() => {
    API.get(`/doctors/${id}`)
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

    // stop if errors exist
    if (Object.keys(newErrors).length > 0) return;

    // ⭐ Update API call
    API.put(`/doctors/${id}`, form)
      .then(() => navigate("/doctors"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Doctor</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
        />
        {errors.specialization && (
          <p className="error-text">{errors.specialization}</p>
        )}

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error-text">{errors.phone}</p>}

        <input
          name="qualification"
          placeholder="Qualification"
          value={form.qualification}
          onChange={handleChange}
        />
        {errors.qualification && (
          <p className="error-text">{errors.qualification}</p>
        )}

        <input
          name="experience"
          placeholder="Experience (Years)"
          value={form.experience}
          onChange={handleChange}
        />
        {errors.experience && (
          <p className="error-text">{errors.experience}</p>
        )}

        <button className="submit-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditDoctor;
