package com.testePratico.testePratico.dto.request;

import com.testePratico.testePratico.entity.SchoolEntity;
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
    private Integer type;
    private String typeDescription;
    private String schoolStatus;
}
