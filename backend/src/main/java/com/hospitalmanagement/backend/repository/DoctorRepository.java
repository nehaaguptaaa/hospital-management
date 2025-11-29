package com.hospitalmanagement.backend.repository;

import com.hospitalmanagement.backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

}
