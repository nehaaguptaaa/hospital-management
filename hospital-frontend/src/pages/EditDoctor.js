import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import "./AddDoctor.css";  // reuse styles

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
        <br />

        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
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
          name="qualification"
          placeholder="Qualification"
          value={form.qualification}
          onChange={handleChange}
        />
        <br />

        <input
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />
        <br />

        <button className="submit-button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditDoctor;
