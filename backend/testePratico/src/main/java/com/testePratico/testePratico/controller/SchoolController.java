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

import java.util.List;

@RestController
@RequestMapping("/schools")
@Tag(name = "Escolas", description = "Endpoints para gerenciamento de escolas")
public class SchoolController {
    @Autowired
    private SchoolService schoolService;

    @Operation(summary = "Buscar escola por id")
    @GetMapping
    public ResponseEntity<SchoolResponseDTO> getSchoolById(@RequestParam Long id) {
        return ResponseEntity.ok(schoolService.getSchoolById(id));
    }

    @Operation(summary = "Buscar todas as escola")
    @GetMapping("/all")
    public ResponseEntity<List<SchoolResponseDTO>> getAllSchools() {
        return ResponseEntity.ok(schoolService.getAllSchools());
    }

    @Operation(summary = "Criar escola")
    @PostMapping
    public ResponseEntity<SchoolResponseDTO> create(@RequestBody SchoolRequestDTO dto) {
        return ResponseEntity.ok(schoolService.create(dto));
    }

    @Operation(summary = "Atualizar escola")
    @PutMapping
    public ResponseEntity<SchoolResponseDTO> update(@RequestBody SchoolRequestDTO dto) {
        return ResponseEntity.ok(schoolService.update(dto));
    }

    @Operation(summary = "Deletar escola")
    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam Long id) {
        schoolService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
