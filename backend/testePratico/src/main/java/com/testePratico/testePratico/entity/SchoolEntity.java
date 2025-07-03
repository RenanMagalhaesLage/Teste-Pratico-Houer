package com.testePratico.testePratico.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name= "tb_school")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class SchoolEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @CreationTimestamp
    private Instant creationTimestamp;

    @UpdateTimestamp
    private Instant updateTimestamp;
}
