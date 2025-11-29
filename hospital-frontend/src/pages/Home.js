import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="home-content">
        <h1>Welcome to the Hospital Management System</h1>
        <p>
          Manage Patients, Doctors, and Appointments effectively with a clean
          modern interface.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966482.png"
          alt="hospital"
          className="home-image"
        />
      </div>

    </div>
  );
}

export default Home;
