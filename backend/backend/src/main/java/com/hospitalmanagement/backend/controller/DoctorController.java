package com.hospitalmanagement.backend.controller;

import com.hospitalmanagement.backend.dto.DoctorDto;
import com.hospitalmanagement.backend.entity.Doctor;
import com.hospitalmanagement.backend.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/api/doctors")
    @CrossOrigin("*")
    public class DoctorController {

        private final DoctorService service;

        public DoctorController(DoctorService service) {
            this.service = service;
        }

        @PostMapping
        public Doctor create(@RequestBody DoctorDto dto) {
            return service.addDoctor(dto);
        }

        @GetMapping
        public List<Doctor> getAll() {
            return service.getAllDoctors();
        }

        @GetMapping("/{id}")
        public Doctor getOne(@PathVariable Long id) {
            return service.getDoctor(id);
        }

        @PutMapping("/{id}")
        public Doctor update(@PathVariable Long id, @RequestBody DoctorDto dto) {
            return service.updateDoctor(id, dto);
        }

        @DeleteMapping("/{id}")
        public String delete(@PathVariable Long id) {
            service.deleteDoctor(id);
            return "Doctor deleted successfully";
        }
    }

