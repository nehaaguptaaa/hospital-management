package com.hospitalmanagement.backend.controller;

import com.hospitalmanagement.backend.dto.PatientDto;
import com.hospitalmanagement.backend.entity.Patient;
import com.hospitalmanagement.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin
public  class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    public Patient create(@RequestBody PatientDto patientDto){
        Patient p = patientService.createPatient(patientDto);
        return p;
    }

    @GetMapping
    public List<Patient> getAll() {
        return patientService.getAllPatients();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Patient getOne(@PathVariable Long id) {
        return patientService.getPatient(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Patient update(@PathVariable Long id, @RequestBody PatientDto dto) {
        return patientService.updatePatient(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        patientService.deletePatient(id);
        return "Patient deleted successfully";
    }
}
