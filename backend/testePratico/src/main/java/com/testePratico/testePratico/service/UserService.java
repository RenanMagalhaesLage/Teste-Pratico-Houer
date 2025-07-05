package com.testePratico.testePratico.service;

import com.testePratico.testePratico.dto.request.UserRequestDTO;
import com.testePratico.testePratico.dto.response.UserResponseDTO;
import com.testePratico.testePratico.entity.UserEntity;

import com.testePratico.testePratico.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Boolean searchEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    public UserResponseDTO create(UserRequestDTO dto) {
        UserEntity saved = userRepository.save(converterDtoToEntity(dto));
        log.info("User created: id={}, name={}", saved.getId(), saved.getUsername());
        return converterEntityToDto(saved);
    }

    public UserResponseDTO update(UserRequestDTO dto) {
        if (!userRepository.existsById(dto.getId())) {
            throw new RuntimeException("User with id " + dto.getId() + " not found");
        }
        UserEntity userEntity = converterDtoToEntity(dto);
        userEntity.setId(dto.getId());

        UserEntity updated = userRepository.save(userEntity);
        log.info("School updated: id={}, name={}", updated.getId(), updated.getUsername());
        return converterEntityToDto(updated);
    }

    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User with id " + id + " not found");
        }
        userRepository.deleteById(id);
        log.info("User deleted: id={}", id);
    }

    public UserEntity converterDtoToEntity(UserRequestDTO dto){
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(dto.getUsername());
        userEntity.setEmail(dto.getEmail());
        userEntity.setPassword(dto.getPassword());

        return userEntity;
    }

    public UserResponseDTO converterEntityToDto(UserEntity entity) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setEmail(entity.getEmail());
        dto.setPassword(dto.getPassword());

        return dto;
    }
}
