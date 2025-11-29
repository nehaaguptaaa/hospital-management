package com.hospitalmanagement.backend.controller;

import com.hospitalmanagement.backend.dto.AppointmentDto;
import com.hospitalmanagement.backend.entity.Appointment;
import com.hospitalmanagement.backend.service.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @PostMapping
    public Appointment create(@RequestBody AppointmentDto dto) {
        return service.createAppointment(dto);
    }

    @GetMapping
    public List<Appointment> getAll() {
        return service.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getOne(@PathVariable Long id) {
        return service.getAppointment(id);
    }

    @PutMapping("/{id}")
    public Appointment update(@PathVariable Long id, @RequestBody AppointmentDto dto) {
        return service.updateAppointment(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteAppointment(id);
        return "Appointment deleted successfully";
    }
}
