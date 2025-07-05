package com.testePratico.testePratico.controller;

import com.testePratico.testePratico.dto.request.SchoolRequestDTO;
import com.testePratico.testePratico.dto.request.UserRequestDTO;
import com.testePratico.testePratico.dto.response.SchoolResponseDTO;
import com.testePratico.testePratico.dto.response.UserResponseDTO;
import com.testePratico.testePratico.service.SchoolService;
import com.testePratico.testePratico.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "Pesquisar se email já é usado")
    @GetMapping
    public ResponseEntity<Boolean> searchEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.searchEmail(email));
    }

    @Operation(summary = "Criar usuário")
    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@RequestBody UserRequestDTO dto) {
        return ResponseEntity.ok(userService.create(dto));
    }

    @Operation(summary = "Atualizar usuário")
    @PutMapping
    public ResponseEntity<UserResponseDTO> update(@RequestBody UserRequestDTO dto) {
        return ResponseEntity.ok(userService.update(dto));
    }

    @Operation(summary = "Deletar usuário")
    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
