package com.testePratico.testePratico.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SchoolDependencyResponseDTO {
    private Long id;
    private String name;
    private Integer quantity;
    private SchoolResponseDTO school;
}
