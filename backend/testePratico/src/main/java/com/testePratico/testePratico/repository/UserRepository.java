package com.testePratico.testePratico.repository;

import com.testePratico.testePratico.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    //Optional<UserEntity> findByEmail(String email);

    UserDetails findByEmail(String email);
}
