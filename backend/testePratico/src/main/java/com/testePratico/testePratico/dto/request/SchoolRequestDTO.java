package com.testePratico.testePratico.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SchoolRequestDTO {
    private Long id;
    private String name;
    private String schoolNetwork;
    private String educationBoard;
    private String city;
    private String district;
    private String code;
    private String type;
    private String schoolStatus;
}
