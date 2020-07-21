package com.rbs.apihackathonkronos.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rbs.apihackathonkronos.client.config.ClientConfig;
import com.rbs.apihackathonkronos.client.service.PispRemote;
import com.rbs.apihackathonkronos.client.service.TokenRemote;
import com.rbs.apihackathonkronos.config.HttpRequestContext;
import com.rbs.apihackathonkronos.model.common.AuthorisationCode;
import com.rbs.apihackathonkronos.model.common.HttpRequestHeader;
import com.rbs.apihackathonkronos.model.common.Session;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomestic;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticConsent;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticConsentResponse;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticResponse;
import com.rbs.apihackathonkronos.model.token.TokenRequest;
import com.rbs.apihackathonkronos.model.token.TokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.HttpStatusCodeException;

import static com.rbs.apihackathonkronos.model.common.Constants.*;


public class PispService {

    private static final Logger logger = LoggerFactory.getLogger(PispService.class);

    private PispRemote pispRemote;
    private TokenRemote tokenRemote;
    private ClientConfig clientConfig;
    private ObjectMapper mapper;

    public PispService(PispRemote pispRemote, TokenRemote tokenRemote, ClientConfig clientConfig) {
        this.pispRemote = pispRemote;
        this.tokenRemote = tokenRemote;
        this.clientConfig = clientConfig;
        mapper = new ObjectMapper();
    }

    public TokenResponse initialize(OBWriteDomesticConsent obWriteDomesticConsent) throws Exception {
        try {
            checkInitMode();
            TokenRequest tokenRequest = new TokenRequest();
            tokenRequest.setClientId(clientConfig.getClientId());
            tokenRequest.setClientSecret(clientConfig.getClientSecret());
            tokenRequest.setScope(SCOPE_PAYMENT_VALUE);
            tokenRequest.setGrantType(CLIENT_CRED_GRANT_TYPE_VALUE);
            TokenResponse tokenResponse = tokenRemote.generateToken(tokenRequest);

            HttpRequestHeader httpRequestHeader = HttpRequestContext.get();
            Session session = (Session) CacheManager.getSessionCache().getUnchecked(httpRequestHeader.getSessionId());
            httpRequestHeader.setAuthorization(tokenResponse.getTokenType() + " " + tokenResponse.getAccessToken());
            augmentHeader(httpRequestHeader, session);
            HttpRequestContext.set(httpRequestHeader);

            OBWriteDomesticConsentResponse consentResponse = pispRemote.createPaymentConsent(obWriteDomesticConsent, HttpRequestContext.get());
            session.setPaymentConsentId(consentResponse.getData().getConsentId());
            CacheManager.getSessionCache().put(httpRequestHeader.getSessionId(), session);
            String authorisationUri = createAuthorizeUri(consentResponse.getData().getConsentId());
            String authorisationCode = getAuthorisationCode(authorisationUri);
            TokenRequest tokenRequestForAuthorisation = new TokenRequest();
            tokenRequestForAuthorisation.setClientId(clientConfig.getClientId());
            tokenRequestForAuthorisation.setClientSecret(clientConfig.getClientSecret());
            tokenRequestForAuthorisation.setScope(SCOPE_ACCOUNT_VALUE);
            tokenRequestForAuthorisation.setCode(authorisationCode);
            tokenRequestForAuthorisation.setGrantType(CLIENT_AUTH_GRANT_TYPE_VALUE);
            TokenResponse tokenResponseForAuthorisation = tokenRemote.generateToken(tokenRequestForAuthorisation);
            tokenResponseForAuthorisation.setConsentId(consentResponse.getData().getConsentId());
            return tokenResponseForAuthorisation;
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public String getAuthorisationCode(String authorisationUri) {
        try {
            AuthorisationCode authorisationCode = pispRemote.getAuthorisationCode(authorisationUri);
            String authorisationUrl = authorisationCode.getRedirectUri();
            return org.apache.commons.lang3.StringUtils.substringBetween(authorisationUrl, "code=", "&id_token");
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }

    }

    public OBWriteDomesticConsentResponse createPaymentConsent(OBWriteDomesticConsent obWriteDomesticConsent2) {
        return pispRemote.createPaymentConsent(obWriteDomesticConsent2, HttpRequestContext.get());
    }

    public String createAuthorizeUri(String consentId) {
        return pispRemote.createAuthorizeUri(consentId);
    }

    public OBWriteDomesticResponse createDomesticPayment(OBWriteDomestic obWriteDomestic2) throws Exception {

        try {
            return augmentPayment(obWriteDomestic2);
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBWriteDomesticResponse getPaymentStatus(String paymentId) {
        try {
            return pispRemote.getPaymentStatus(paymentId, HttpRequestContext.get());
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    private OBWriteDomesticResponse augmentPayment(OBWriteDomestic obWriteDomestic) {
        try {
            return pispRemote.createDomesticPayment(obWriteDomestic, HttpRequestContext.get());
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }

    }

    private void checkInitMode() {
        if (Boolean.FALSE.equals(clientConfig.isInitRunning())) {
            throw new RuntimeException("SDK is not running in INIT mode");
        }

    }

    private void augmentHeader(HttpRequestHeader httpRequestHeader, Session session) {
        httpRequestHeader.setFinancialId(clientConfig.getFinancialId());
        httpRequestHeader.setJwsSignature("DUMMY_SIG");
        httpRequestHeader.setIdempotencyKey(session.getIdempotencyKey());
    }

}
