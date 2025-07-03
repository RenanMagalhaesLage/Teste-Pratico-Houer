package com.testePratico.testePratico.repository;

import com.testePratico.testePratico.entity.SchoolEntity;
import com.testePratico.testePratico.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends JpaRepository<SchoolEntity, Long> {

}
