package com.testePratico.testePratico.domain.dto.request;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequestDTO {
    private Long id;

    private String username;

    private String email;

    private String password;

}
