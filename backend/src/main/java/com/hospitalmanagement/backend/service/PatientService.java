package com.hospitalmanagement.backend.service;

import com.hospitalmanagement.backend.dto.PatientDto;
import com.hospitalmanagement.backend.entity.Patient;
import com.hospitalmanagement.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public  class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient createPatient(PatientDto patientDto){
        Patient p = new Patient();
        p.setName(patientDto.getName());
        p.setAge(patientDto.getAge());
        p.setGender(patientDto.getGender());
        p.setPhone(patientDto.getPhone());
        p.setAddress(patientDto.getAddress());
        p.setDisease(patientDto.getDisease());
        return patientRepository.save(p);
    }

    // READ ALL
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // READ BY ID
    public Patient getPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    // UPDATE
    public Patient updatePatient(Long id, PatientDto dto) {
        Patient p = getPatient(id);

        p.setName(dto.getName());
        p.setAge(dto.getAge());
        p.setGender(dto.getGender());
        p.setPhone(dto.getPhone());
        p.setAddress(dto.getAddress());
        p.setDisease(dto.getDisease());

        return patientRepository.save(p);
    }

    // DELETE
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }



}