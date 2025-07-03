package com.testePratico.testePratico.repository;

import com.testePratico.testePratico.entity.SchoolDependencyEntity;
import com.testePratico.testePratico.entity.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolDependencyRepository extends JpaRepository<SchoolDependencyEntity, Long> {
    List<SchoolDependencyEntity> findAllBySchool(SchoolEntity school);
}
