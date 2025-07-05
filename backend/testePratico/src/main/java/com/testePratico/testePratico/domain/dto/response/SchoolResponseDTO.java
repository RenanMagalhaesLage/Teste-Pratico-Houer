package com.testePratico.testePratico.domain.dto.response;

import com.testePratico.testePratico.domain.entity.SchoolTypeEntity;
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
    private SchoolTypeEntity type;
    private String schoolStatus;
}
