package com.testePratico.testePratico.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public record AuthenticationRequestDTO ( String email, String password){
}
