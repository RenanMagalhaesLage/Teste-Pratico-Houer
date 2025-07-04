package com.testePratico.testePratico.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SchoolResponseDTO {
    private Long id;
    private String name;
    private String schoolNetwork;
    private String educationBoard;
    private String city;
    private String district;
    private String code;
    private Integer type;
    private String typeDescription;
    private Integer schoolStatus;
}
