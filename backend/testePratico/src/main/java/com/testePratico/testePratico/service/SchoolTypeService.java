package com.testePratico.testePratico.service;

import com.testePratico.testePratico.dto.request.SchoolRequestDTO;
import com.testePratico.testePratico.dto.response.SchoolResponseDTO;
import com.testePratico.testePratico.entity.SchoolDependencyEntity;
import com.testePratico.testePratico.entity.SchoolEntity;
import com.testePratico.testePratico.entity.SchoolTypeEntity;
import com.testePratico.testePratico.repository.SchoolDependencyRepository;
import com.testePratico.testePratico.repository.SchoolRepository;
import com.testePratico.testePratico.repository.SchoolTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SchoolTypeService {

    @Autowired
    private SchoolTypeRepository schoolTypeRepository;

    public SchoolTypeEntity getSchoolTypeById(Long id) {
        SchoolTypeEntity schoolTypeEntity = schoolTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School Type with id " + id + " not found"));

        log.info("School Type found: id={}, description={}", schoolTypeEntity.getId(), schoolTypeEntity.getDescription());
        return schoolTypeEntity;
    }

    public List<SchoolTypeEntity> getAllSchoolType() {
        return schoolTypeRepository.findAll();
    }
}
