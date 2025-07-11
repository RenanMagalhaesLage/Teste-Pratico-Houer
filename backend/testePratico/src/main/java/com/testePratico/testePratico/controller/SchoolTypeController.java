package com.testePratico.testePratico.controller;

import com.testePratico.testePratico.domain.entity.SchoolTypeEntity;
import com.testePratico.testePratico.service.SchoolTypeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/school-types")
@Tag(name = "Tipo de Escolas", description = "Endpoints para gerenciamento de tipos de escolas")
public class SchoolTypeController {
    @Autowired
    private SchoolTypeService schoolTypeService;

    @Operation(summary = "Buscar tipo de escola por id")
    @GetMapping
    public ResponseEntity<SchoolTypeEntity> getSchoolTypeById(@RequestParam Long id) {
        return ResponseEntity.ok(schoolTypeService.getSchoolTypeById(id));
    }

    @Operation(summary = "Buscar todos os tipos de escola")
    @GetMapping("/all")
    public ResponseEntity<List<SchoolTypeEntity>> getAllSchoolType() {
        return ResponseEntity.ok(schoolTypeService.getAllSchoolType());
    }

}
