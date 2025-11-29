package com.hospitalmanagement.backend.repository;

import com.hospitalmanagement.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}
