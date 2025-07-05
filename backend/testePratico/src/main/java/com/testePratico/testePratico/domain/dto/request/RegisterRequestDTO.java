package com.testePratico.testePratico.domain.dto.request;

import com.testePratico.testePratico.enums.UserRoleEnum;

public record RegisterRequestDTO (String username, String email, String password, UserRoleEnum role){
}
