package com.testePratico.testePratico.controller;

import com.testePratico.testePratico.dto.request.SchoolDependencyRequestDTO;
import com.testePratico.testePratico.dto.response.SchoolDependencyResponseDTO;
import com.testePratico.testePratico.service.SchoolDependencyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/school-dependencies")
@Tag(name = "Dependências das Escolas", description = "Endpoints para gerenciamento de dependências das escolas")
public class SchoolDependencyController {
    @Autowired
    private SchoolDependencyService schoolDependencyService;

    @Operation(summary = "Buscar dependências da escola")
    @GetMapping("/by-school")
    public ResponseEntity<List<SchoolDependencyResponseDTO>> getBySchool(@RequestParam Long schoolId) {
        return ResponseEntity.ok(schoolDependencyService.getAllBySchoolId(schoolId));
    }
    @Operation(summary = "Criar dependência da escola")
    @PostMapping
    public ResponseEntity<SchoolDependencyResponseDTO> create(@RequestBody SchoolDependencyRequestDTO dto) {
        return ResponseEntity.ok(schoolDependencyService.create(dto));
    }

    @Operation(summary = "Atualizar dependência da escola")
    @PutMapping
    public ResponseEntity<SchoolDependencyResponseDTO> update(@RequestBody SchoolDependencyRequestDTO dto) {
        return ResponseEntity.ok(schoolDependencyService.update(dto));
    }

    @Operation(summary = "Deletar dependência da escola")
    @DeleteMapping()
    public ResponseEntity<Void> delete(@RequestParam Long id) {
        schoolDependencyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
