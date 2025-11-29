package com.hospitalmanagement.backend.dto;

import lombok.Data;

@Data
public class DoctorDto {
    private String name;
    private String specialization;
    private String phone;
    private String qualification;
    private String experience;
}
