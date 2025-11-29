package com.hospitalmanagement.backend.service;

import com.hospitalmanagement.backend.dto.AppointmentDto;
import com.hospitalmanagement.backend.entity.Appointment;
import com.hospitalmanagement.backend.entity.Doctor;
import com.hospitalmanagement.backend.entity.Patient;
import com.hospitalmanagement.backend.repository.AppointmentRepository;
import com.hospitalmanagement.backend.repository.DoctorRepository;
import com.hospitalmanagement.backend.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepo;
    private final PatientRepository patientRepo;
    private final DoctorRepository doctorRepo;

    public AppointmentService(AppointmentRepository appointmentRepo, PatientRepository patientRepo, DoctorRepository doctorRepo) {
        this.appointmentRepo = appointmentRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }

    // CREATE
    public Appointment createAppointment(AppointmentDto dto) {

        Patient patient = patientRepo.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepo.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment ap = new Appointment();
        ap.setPatient(patient);
        ap.setDoctor(doctor);
        ap.setDate(dto.getDate());
        ap.setTime(dto.getTime());
        ap.setStatus(dto.getStatus() != null ? dto.getStatus() : "SCHEDULED");

        return appointmentRepo.save(ap);
    }

    // GET ALL
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    // GET ONE
    public Appointment getAppointment(Long id) {
        return appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    // UPDATE
    public Appointment updateAppointment(Long id, AppointmentDto dto) {
        Appointment ap = getAppointment(id);

        if (dto.getPatientId() != null) {
            Patient p = patientRepo.findById(dto.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found"));
            ap.setPatient(p);
        }

        if (dto.getDoctorId() != null) {
            Doctor d = doctorRepo.findById(dto.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            ap.setDoctor(d);
        }

        ap.setDate(dto.getDate());
        ap.setTime(dto.getTime());
        ap.setStatus(dto.getStatus());

        return appointmentRepo.save(ap);
    }

    // DELETE
    public void deleteAppointment(Long id) {
        appointmentRepo.deleteById(id);
    }
}
