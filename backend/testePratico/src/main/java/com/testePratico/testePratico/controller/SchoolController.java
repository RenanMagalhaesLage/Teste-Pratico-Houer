package com.testePratico.testePratico.controller;

import com.testePratico.testePratico.dto.request.SchoolRequestDTO;
import com.testePratico.testePratico.dto.response.SchoolResponseDTO;
import com.testePratico.testePratico.entity.SchoolEntity;
import com.testePratico.testePratico.service.SchoolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/schools")
@Tag(name = "Escolas", description = "Endpoints para gerenciamento de escolas")
public class SchoolController {
    @Autowired
    private SchoolService schoolService;

    @Operation(summary = "Buscar escola")
    @GetMapping
    public ResponseEntity<SchoolResponseDTO> getSchoolById(@RequestParam Long id) {
        SchoolResponseDTO found = schoolService.getSchoolById(id);
        return ResponseEntity.ok(found);
    }

    @Operation(summary = "Criar escola")
    @PostMapping
    public ResponseEntity<SchoolResponseDTO> createSchool(@RequestBody SchoolRequestDTO dto) {
        SchoolResponseDTO created = schoolService.createSchool(dto);
        return ResponseEntity.ok(created);
    }

    @Operation(summary = "Atualizar escola")
    @PutMapping
    public ResponseEntity<SchoolResponseDTO> updateSchool(@RequestBody SchoolRequestDTO dto) {
        SchoolResponseDTO updated = schoolService.updateSchool(dto);
        return ResponseEntity.ok(updated);
    }

    @Operation(summary = "Deletar escola")
    @DeleteMapping
    public ResponseEntity<Void> deleteSchool(@RequestParam Long id) {
        schoolService.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}
