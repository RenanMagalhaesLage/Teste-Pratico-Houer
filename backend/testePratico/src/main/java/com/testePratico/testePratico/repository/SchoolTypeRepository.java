package com.testePratico.testePratico.repository;

import com.testePratico.testePratico.domain.entity.SchoolTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SchoolTypeRepository extends JpaRepository<SchoolTypeEntity, Long> {
    Optional<SchoolTypeEntity> findByDescription(String description);
}
