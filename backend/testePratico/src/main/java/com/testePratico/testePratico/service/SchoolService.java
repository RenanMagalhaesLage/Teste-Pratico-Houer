package com.testePratico.testePratico.service;

import com.testePratico.testePratico.dto.request.SchoolRequestDTO;
import com.testePratico.testePratico.dto.response.SchoolResponseDTO;
import com.testePratico.testePratico.entity.SchoolEntity;
import com.testePratico.testePratico.repository.SchoolRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SchoolService {

    @Autowired
    private SchoolRepository schoolRepository;

    public SchoolResponseDTO getSchoolById(Long id) {
        SchoolEntity entity = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School with id " + id + " not found"));

        log.info("School found: id={}, name={}", entity.getId(), entity.getName());
        return converterEntityToDto(entity);
    }

    public SchoolResponseDTO createSchool(SchoolRequestDTO dto) {
        SchoolEntity schoolEntity = converterDtoToEntity(dto);
        SchoolEntity saved = schoolRepository.save(schoolEntity);
        log.info("School created successfully: id={}, name={}", saved.getId(), saved.getName());

        return converterEntityToDto(saved);
    }

    public SchoolResponseDTO updateSchool(SchoolRequestDTO dto) {
        if (!schoolRepository.existsById(dto.getId())) {
            throw new RuntimeException("School with id " + dto.getId() + " not found");
        }
        SchoolEntity schoolEntity = converterDtoToEntity(dto);
        schoolEntity.setId(dto.getId());

        SchoolEntity updated = schoolRepository.save(schoolEntity);
        log.info("School updated successfully: id={}, name={}", updated.getId(), updated.getName());
        return converterEntityToDto(updated);
    }

    public void deleteSchool(Long id) {
        if (!schoolRepository.existsById(id)) {
            throw new RuntimeException("School with id " + id + " not found");
        }
        schoolRepository.deleteById(id);
        log.info("School deleted successfully: id={}", id);
    }

    public SchoolEntity converterDtoToEntity(SchoolRequestDTO dto){
        SchoolEntity schoolEntity = new SchoolEntity();
        schoolEntity.setName(dto.getName());
        schoolEntity.setSchoolNetwork(dto.getSchoolNetwork());
        schoolEntity.setEducationBoard(dto.getEducationBoard());
        schoolEntity.setCity(dto.getCity());
        schoolEntity.setDistrict(dto.getDistrict());
        schoolEntity.setCode(dto.getCode());
        schoolEntity.setType(dto.getType());
        schoolEntity.setTypeDescription(dto.getTypeDescription());
        schoolEntity.setSchoolStatus(dto.getSchoolStatus());

        return schoolEntity;
    }

    public static SchoolResponseDTO converterEntityToDto(SchoolEntity entity) {
        SchoolResponseDTO dto = new SchoolResponseDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSchoolNetwork(entity.getSchoolNetwork());
        dto.setEducationBoard(entity.getEducationBoard());
        dto.setCity(entity.getCity());
        dto.setDistrict(entity.getDistrict());
        dto.setCode(entity.getCode());
        dto.setType(entity.getType());
        dto.setTypeDescription(entity.getTypeDescription());
        dto.setSchoolStatus(entity.getSchoolStatus());

        return dto;
    }
}
