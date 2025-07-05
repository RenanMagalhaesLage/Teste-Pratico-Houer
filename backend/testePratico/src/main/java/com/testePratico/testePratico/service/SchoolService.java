package com.testePratico.testePratico.service;

import com.testePratico.testePratico.domain.dto.request.SchoolRequestDTO;
import com.testePratico.testePratico.domain.dto.response.SchoolResponseDTO;
import com.testePratico.testePratico.domain.entity.SchoolDependencyEntity;
import com.testePratico.testePratico.domain.entity.SchoolEntity;
import com.testePratico.testePratico.domain.entity.SchoolTypeEntity;
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
public class SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private SchoolDependencyRepository schoolDependencyRepository;
    @Autowired
    private SchoolTypeRepository schoolTypeRepository;

    public SchoolResponseDTO getSchoolById(Long id) {
        SchoolEntity schoolEntity = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School with id " + id + " not found"));

        log.info("School found: id={}, name={}", schoolEntity.getId(), schoolEntity.getName());
        return converterEntityToDto(schoolEntity);
    }

    public List<SchoolResponseDTO> getAllSchools() {
        List<SchoolEntity> schoolEntityList = schoolRepository.findAll();

        List<SchoolResponseDTO> dtos = new ArrayList<>();
        for (SchoolEntity schoolEntity : schoolEntityList){
            dtos.add(converterEntityToDto(schoolEntity));
        }
        return dtos;
    }

    public SchoolResponseDTO create(SchoolRequestDTO dto) {
        Optional<SchoolTypeEntity> schoolTypeOpt = schoolTypeRepository.findByDescription(dto.getType());
        SchoolTypeEntity schoolTypeEntity = schoolTypeOpt.orElseGet(() -> schoolTypeRepository.saveAndFlush(SchoolTypeEntity.builder().description(dto.getType()).build()));

        SchoolEntity schoolEntity = converterDtoToEntity(dto, schoolTypeEntity);
        SchoolEntity saved = schoolRepository.save(schoolEntity);
        log.info("School created: id={}, name={}", saved.getId(), saved.getName());

        return converterEntityToDto(saved);
    }

    public SchoolResponseDTO update(SchoolRequestDTO dto) {
        if (!schoolRepository.existsById(dto.getId())) {
            throw new RuntimeException("School with id " + dto.getId() + " not found");
        }
        Optional<SchoolTypeEntity> schoolTypeOpt = schoolTypeRepository.findByDescription(dto.getType());
        SchoolTypeEntity schoolTypeEntity = schoolTypeOpt.orElseGet(() -> schoolTypeRepository.saveAndFlush(SchoolTypeEntity.builder().description(dto.getType()).build()));

        SchoolEntity schoolEntity = converterDtoToEntity(dto, schoolTypeEntity);
        schoolEntity.setId(dto.getId());

        SchoolEntity updated = schoolRepository.save(schoolEntity);
        log.info("School updated: id={}, name={}", updated.getId(), updated.getName());
        return converterEntityToDto(updated);
    }

    public void delete(Long id) {
        if (!schoolRepository.existsById(id)) {
            throw new RuntimeException("School with id " + id + " not found");
        }

        SchoolEntity schoolEntity = schoolRepository.findById(id).orElse(null);
        List<SchoolDependencyEntity> schoolDependencyEntityList = schoolDependencyRepository.findAllBySchool(schoolEntity);

        for(SchoolDependencyEntity schoolDependencyEntity :  schoolDependencyEntityList){
            schoolDependencyRepository.deleteById(schoolDependencyEntity.getId());
        }

        schoolRepository.deleteById(id);
        log.info("School deleted: id={}", id);
    }

    public SchoolEntity converterDtoToEntity(SchoolRequestDTO dto, SchoolTypeEntity schoolTypeEntity){
        SchoolEntity schoolEntity = new SchoolEntity();
        schoolEntity.setName(dto.getName());
        schoolEntity.setSchoolNetwork(dto.getSchoolNetwork());
        schoolEntity.setEducationBoard(dto.getEducationBoard());
        schoolEntity.setCity(dto.getCity());
        schoolEntity.setDistrict(dto.getDistrict());
        schoolEntity.setCode(dto.getCode());
        schoolEntity.setType(schoolTypeEntity);
        schoolEntity.setSchoolStatus(dto.getSchoolStatus());

        return schoolEntity;
    }

    public SchoolResponseDTO converterEntityToDto(SchoolEntity entity) {
        SchoolResponseDTO dto = new SchoolResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSchoolNetwork(entity.getSchoolNetwork());
        dto.setEducationBoard(entity.getEducationBoard());
        dto.setCity(entity.getCity());
        dto.setDistrict(entity.getDistrict());
        dto.setCode(entity.getCode());
        dto.setType(entity.getType());
        dto.setSchoolStatus(entity.getSchoolStatus());

        return dto;
    }
}
