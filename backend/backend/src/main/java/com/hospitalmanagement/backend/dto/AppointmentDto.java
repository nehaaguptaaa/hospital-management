package com.hospitalmanagement.backend.dto;

import lombok.Data;

@Data
public class AppointmentDto {

    private Long patientId;
    private Long doctorId;
    private String date;
    private String time;
    private String status;  // optional
}
