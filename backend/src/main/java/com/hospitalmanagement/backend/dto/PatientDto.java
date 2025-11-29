package com.hospitalmanagement.backend.dto;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
public class PatientDto {
    private String name;
    private int age;
    private String gender;
    private String phone;
    private String address;
    private String disease;
}
