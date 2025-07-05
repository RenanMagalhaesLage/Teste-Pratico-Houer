package com.testePratico.testePratico.service;

import com.testePratico.testePratico.domain.dto.request.SchoolDependencyRequestDTO;
import com.testePratico.testePratico.domain.dto.response.SchoolDependencyResponseDTO;
import com.testePratico.testePratico.domain.entity.SchoolDependencyEntity;
import com.testePratico.testePratico.domain.entity.SchoolEntity;
import com.testePratico.testePratico.repository.SchoolDependencyRepository;
import com.testePratico.testePratico.repository.SchoolRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class SchoolDependencyService {
    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private SchoolDependencyRepository schoolDependencyRepository;
    @Autowired
    private SchoolService schoolService;

    public SchoolDependencyResponseDTO getSchoolDependencyById(Long id) {
        SchoolDependencyEntity schoolDependencyEntity = schoolDependencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School Dependency with id " + id + " not found"));

        log.info("School found: id={}, name={}", schoolDependencyEntity.getId(), schoolDependencyEntity.getName());
        return converterEntityToDto(schoolDependencyEntity);
    }

    public List<SchoolDependencyResponseDTO> getAllBySchoolId(Long schoolId) {
        SchoolEntity school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> new RuntimeException("School not found with id " + schoolId));
        List<SchoolDependencyEntity> entityList = schoolDependencyRepository.findAllBySchool(school);
        List<SchoolDependencyResponseDTO> dtos = new ArrayList<SchoolDependencyResponseDTO>();
        for(SchoolDependencyEntity entity : entityList){
            dtos.add(converterEntityToDto(entity));
        }
        return dtos;
    }
    public SchoolDependencyResponseDTO create(SchoolDependencyRequestDTO dto) {
        SchoolEntity schoolEntity = schoolRepository.findById(dto.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School with id " + dto.getSchoolId() + " not found"));
        SchoolDependencyEntity entity = converterDtoToEntity(dto, schoolEntity);
        SchoolDependencyEntity saved = schoolDependencyRepository.save(entity);
        log.info("School Dependency created: id={}, name={}", saved.getId(), saved.getName());
        return converterEntityToDto(saved);
    }

    public SchoolDependencyResponseDTO update(SchoolDependencyRequestDTO dto) {
        SchoolDependencyEntity existing = schoolDependencyRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("School Dependency with id " + dto.getId() + " not found"));
        SchoolEntity school = schoolRepository.findById(dto.getSchoolId())
                .orElseThrow(() -> new RuntimeException("School with id " + dto.getSchoolId() + " not found"));

        existing.setName(dto.getName());
        existing.setQuantity(dto.getQuantity());
        existing.setSchool(school);

        SchoolDependencyEntity updated = schoolDependencyRepository.save(existing);
        log.info("School Dependency updated: id={}, name={}", updated.getId(), updated.getName());
        return converterEntityToDto(updated);
    }

    public void delete(Long id) {
        if (!schoolDependencyRepository.existsById(id)) {
            throw new RuntimeException("SchoolDependency with id " + id + " not found");
        }
        schoolDependencyRepository.deleteById(id);
        log.info("SchoolDependency deleted: id={}", id);
    }
    public SchoolDependencyEntity converterDtoToEntity(SchoolDependencyRequestDTO dto, SchoolEntity school) {
        SchoolDependencyEntity entity = new SchoolDependencyEntity();
        entity.setName(dto.getName());
        entity.setQuantity(dto.getQuantity());
        entity.setSchool(school);
        return entity;
    }

    public SchoolDependencyResponseDTO converterEntityToDto(SchoolDependencyEntity entity) {
        SchoolDependencyResponseDTO dto = new SchoolDependencyResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setQuantity(entity.getQuantity());
        dto.setSchool(schoolService.converterEntityToDto(entity.getSchool()));
        return dto;
    }
}
