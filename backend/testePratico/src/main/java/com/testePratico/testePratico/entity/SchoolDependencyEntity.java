package com.testePratico.testePratico.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name= "tb_school_dependency")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SchoolDependencyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schoolDependencyId;

    private String name;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolEntity school;
}
