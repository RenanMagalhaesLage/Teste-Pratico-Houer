package com.testePratico.testePratico.controller;

import com.testePratico.testePratico.domain.dto.request.AuthenticationRequestDTO;
import com.testePratico.testePratico.domain.dto.request.RegisterRequestDTO;
import com.testePratico.testePratico.domain.dto.response.LoginResponseDTO;
import com.testePratico.testePratico.domain.entity.UserEntity;
import com.testePratico.testePratico.repository.UserRepository;
import com.testePratico.testePratico.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationRequestDTO dto){
        var userNamePassword = new UsernamePasswordAuthenticationToken(dto.email(), dto.password());
        var auth = this.authenticationManager.authenticate(userNamePassword);

        var token = tokenService.generateToken((UserEntity) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    };

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO dto){
        if(userRepository.findByEmail(dto.email()) !=null) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.password());
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(dto.username());
        userEntity.setEmail(dto.email());
        userEntity.setPassword(encryptedPassword);
        userEntity.setRole(dto.role());

        userRepository.save(userEntity);

        return ResponseEntity.ok().build();
    }
}
