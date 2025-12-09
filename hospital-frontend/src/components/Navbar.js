import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand fw-bold fs-3" to="/">
  <span className="text-warning">Care</span>Sync
</Link>


      {/* Toggle Button for Mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          
          <li className="nav-item">
            <Link className="nav-link" to="/patients">
              Patients
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/doctors">
              Doctors
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/appointments">
              Appointments
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
