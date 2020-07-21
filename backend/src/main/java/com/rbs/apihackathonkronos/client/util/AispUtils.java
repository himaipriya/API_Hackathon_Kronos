package com.rbs.apihackathonkronos.client.util;


import com.rbs.apihackathonkronos.client.config.AispConfig;
import com.rbs.apihackathonkronos.client.config.ClientConfig;

public class AispUtils extends BaseApiUtils {

    private final ClientConfig clientConfig;
    private final AispConfig aispConfig;
    private static final String AUTHORISATION_MODE = "AUTO_POSTMAN";
    private static final String AUTHORISATION_RESULT = "APPROVED";

    public AispUtils(AispConfig aispConfig, ClientConfig clientConfig) {
        this.aispConfig = aispConfig;
        this.clientConfig = clientConfig;
    }

    @Override
    public String getUri(String path) {
        return String.format("%s%s%s", aispConfig.getAispBaseUri(), aispConfig.getAispContext(), path);
    }

    @Override
    public String createAuthorizeUrl(String consentId) {
        return String.format("%s?client_id=%s&response_type=code id_token&scope=openid accounts&redirect_uri=%s&state=%s&request=%s&authorization_mode=%s&authorization_result=%s&authorization_username=%s&authorization_accounts=%s",
                aispConfig.getAispAudience(),
                clientConfig.getClientId(),
                clientConfig.getRedirectUri(),
                clientConfig.getClientState(),
                consentId,
                AUTHORISATION_MODE,
                AUTHORISATION_RESULT,
                clientConfig.getAuthorizationUsername(),
                clientConfig.getAuthorizationAccount());
    }

}