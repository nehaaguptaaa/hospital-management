import { Link } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    marginRight: "15px",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={{ backgroundColor: "#1976d2", padding: "10px 20px" }}>
      <Link to="/" style={{ ...linkStyle, fontSize: "20px" }}>
        HMS
      </Link>
      <Link to="/patients" style={linkStyle}>
        Patients
      </Link>
      <Link to="/doctors" style={linkStyle}>
        Doctors
      </Link>
      <Link to="/appointments" style={linkStyle}>
        Appointments
      </Link>
    </div>
  );
}

export default Navbar;
