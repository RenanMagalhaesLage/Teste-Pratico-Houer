package com.testePratico.testePratico.controller;

import com.testePratico.testePratico.domain.dto.request.UserRequestDTO;
import com.testePratico.testePratico.domain.dto.response.UserResponseDTO;
import com.testePratico.testePratico.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
public class UserController {
    @Autowired
    private UserService userService;

}
