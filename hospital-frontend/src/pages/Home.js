function Home() {
  return (
    <div>

      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold mb-3">Welcome to <span className="text-warning">CareSync</span>
</h1>
        <p className="fs-5 mb-4">
          CareSync — Smarter Healthcare, Seamlessly Connected.

        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966482.png"
          alt="hospital"
          className="img-fluid mb-3"
          style={{ width: "180px" }}
        />

        <div>
          <a href="/patients" className="btn btn-light btn-lg px-4 mt-3 fw-bold">
            Get Started
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Key Features</h2>

        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card shadow h-100 text-center p-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                alt="patients"
                className="img-fluid mx-auto"
                style={{ width: "90px" }}
              />
              <h4 className="mt-3 fw-bold">Manage Patients</h4>
              <p className="text-muted">
                Add, edit, search, filter, and handle patient records effortlessly.
              </p>
              <a href="/patients" className="btn btn-primary mt-auto">
                View Patients
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card shadow h-100 text-center p-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3107/3107129.png"
                alt="doctors"
                className="img-fluid mx-auto"
                style={{ width: "90px" }}
              />
              <h4 className="mt-3 fw-bold">Manage Doctors</h4>
              <p className="text-muted">
                Handle doctor profiles, specialties, experience, and contact details.
              </p>
              <a href="/doctors" className="btn btn-primary mt-auto">
                View Doctors
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card shadow h-100 text-center p-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/10685/10685210.png"
                alt="appointments"
                className="img-fluid mx-auto"
                style={{ width: "90px" }}
              />
              <h4 className="mt-3 fw-bold">Manage Appointments</h4>
              <p className="text-muted">
                Schedule, update, filter, and track patient appointments easily.
              </p>
              <a href="/appointments" className="btn btn-primary mt-auto">
                View Appointments
              </a>
            </div>
          </div>

        </div>
      </div>

      
      

    </div>
  );
}

export default Home;
