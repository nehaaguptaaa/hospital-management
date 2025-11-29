package com.hospitalmanagement.backend.repository;

import com.hospitalmanagement.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient,Long> {

}
