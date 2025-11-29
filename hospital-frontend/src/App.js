import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PatientList from "./pages/PatientList";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";   // 👈 NEW
import DoctorList from "./pages/DoctorList";
import AddDoctor from "./pages/AddDoctor";
import AppointmentList from "./pages/AppointmentList";
import AddAppointment from "./pages/AddAppointment";
import EditDoctor from "./pages/EditDoctor";
import EditAppointment from "./pages/EditAppointment";

function App() {
  return (
    <div className="app-layout">
      <Router>
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* PATIENT ROUTES */}
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/add" element={<AddPatient />} />
            <Route path="/patients/edit/:id" element={<EditPatient />} /> {/* 👈 NEW */}

            {/* DOCTORS */}
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/add" element={<AddDoctor />} />
            <Route path="/doctors/edit/:id" element={<EditDoctor />} />


            {/* APPOINTMENTS */}
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/add" element={<AddAppointment />} />
            <Route path="/appointments/edit/:id" element={<EditAppointment />} />

          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
