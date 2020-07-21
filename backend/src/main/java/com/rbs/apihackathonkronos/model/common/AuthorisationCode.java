package com.rbs.apihackathonkronos.model.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class AuthorisationCode {
    private String redirectUri;
}
