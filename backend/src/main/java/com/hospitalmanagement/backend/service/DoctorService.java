package com.hospitalmanagement.backend.service;

import com.hospitalmanagement.backend.dto.DoctorDto;
import com.hospitalmanagement.backend.entity.Doctor;
import com.hospitalmanagement.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;



    // CREATE
    public Doctor addDoctor(DoctorDto dto) {
        Doctor d = new Doctor();
        d.setName(dto.getName());
        d.setSpecialization(dto.getSpecialization());
        d.setPhone(dto.getPhone());
        d.setQualification(dto.getQualification());
        d.setExperience(dto.getExperience());

        return doctorRepository.save(d);
    }

    // GET ALL
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // GET ONE
    public Doctor getDoctor(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    // UPDATE
    public Doctor updateDoctor(Long id, DoctorDto dto) {
        Doctor d = getDoctor(id);

        d.setName(dto.getName());
        d.setSpecialization(dto.getSpecialization());
        d.setPhone(dto.getPhone());
        d.setQualification(dto.getQualification());
        d.setExperience(dto.getExperience());

        return doctorRepository.save(d);
    }

    // DELETE
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
