import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    qualification: "",
    experience: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("/doctors", form)
      .then(() => navigate("/doctors"))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Doctor</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /> <br />
        <input name="specialization" placeholder="Specialization" onChange={handleChange} /> <br />
        <input name="phone" placeholder="Phone" onChange={handleChange} /> <br />
        <input name="qualification" placeholder="Qualification" onChange={handleChange} /> <br />
        <input name="experience" placeholder="Experience" onChange={handleChange} /> <br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddDoctor;
