package com.rbs.apihackathonkronos.model.token;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRequest {
    @JsonProperty("client_id")
    private String clientId;

    @JsonProperty("client_secret")
    private String clientSecret;

    @JsonProperty("redirect_uri")
    private String redirectUri;

    @JsonProperty("grant_type")
    private String grantType;

    @JsonProperty("code")
    private String code;

    @JsonProperty("scope")
    private String scope;

    @JsonProperty("code_verifier")
    private String codeVerifier;

    @JsonProperty("code_challenge_method")
    private String codeChallengeMethod;
}
