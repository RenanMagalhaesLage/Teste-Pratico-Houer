package com.testePratico.testePratico.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SchoolDependencyRequestDTO {
    private Long id;
    private String name;
    private Integer quantity;
    private Long schoolId;
}
