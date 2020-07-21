package com.rbs.apihackathonkronos.service;


import com.rbs.apihackathonkronos.client.config.ClientConfig;
import com.rbs.apihackathonkronos.client.service.AispRemote;
import com.rbs.apihackathonkronos.client.service.TokenRemote;
import com.rbs.apihackathonkronos.config.HttpRequestContext;
import com.rbs.apihackathonkronos.model.accounts.*;
import com.rbs.apihackathonkronos.model.common.AuthorisationCode;
import com.rbs.apihackathonkronos.model.common.HttpRequestHeader;
import com.rbs.apihackathonkronos.model.payments.OBRisk;
import com.rbs.apihackathonkronos.model.token.TokenRequest;
import com.rbs.apihackathonkronos.model.token.TokenResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.Arrays;

import static com.rbs.apihackathonkronos.model.common.Constants.*;


public class AispService {

    private static final Logger logger = LoggerFactory.getLogger(AispService.class);

    private AispRemote aispRemote;
    private TokenRemote tokenRemote;
    private ClientConfig clientConfig;

    public AispService(AispRemote aispRemote, TokenRemote tokenRemote, ClientConfig clientConfig) {
        this.aispRemote = aispRemote;
        this.tokenRemote = tokenRemote;
        this.clientConfig = clientConfig;
    }

    public TokenResponse initialize() {
        try {

            if (Boolean.FALSE.equals(clientConfig.isInitRunning())) {
                throw new RuntimeException("SDK is not running in INIT mode");
            }

            TokenRequest tokenRequest = new TokenRequest();
            tokenRequest.setClientId(clientConfig.getClientId());
            tokenRequest.setClientSecret(clientConfig.getClientSecret());
            tokenRequest.setScope(SCOPE_ACCOUNT_VALUE);
            tokenRequest.setGrantType(CLIENT_CRED_GRANT_TYPE_VALUE);
            TokenResponse tokenResponse = tokenRemote.generateToken(tokenRequest);

            HttpRequestHeader httpRequestHeader = HttpRequestContext.get();
            httpRequestHeader.setAuthorization(tokenResponse.getTokenType() + " " + tokenResponse.getAccessToken());
            httpRequestHeader.setFinancialId(clientConfig.getFinancialId());
            HttpRequestContext.set(httpRequestHeader);

            String[] aispPermissions = new String[]{"ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances",
                    "ReadBeneficiariesBasic", "ReadBeneficiariesDetail", "ReadDirectDebits",
                    "ReadProducts", "ReadStandingOrdersBasic", "ReadStandingOrdersDetail",
                    "ReadTransactionsBasic", "ReadTransactionsCredits", "ReadTransactionsDebits",
                    "ReadTransactionsDetail"};

            OBReadDomesticConsent obReadDataDomesticConsent = new OBReadDomesticConsent();
            obReadDataDomesticConsent.setData(new OBReadDataDomesticConsent());
            obReadDataDomesticConsent.setRisk(new OBRisk());

            obReadDataDomesticConsent.getData().setPermissions(Arrays.asList(aispPermissions));
            OBReadDomesticConsentResponse obReadDomesticConsentResponse =
                    aispRemote.createAispConsent(obReadDataDomesticConsent, HttpRequestContext.get());
            String authorisationUri = createAuthorizeUri(obReadDomesticConsentResponse.getData().getConsentId());
            String authorisationCode = getAuthorisationCode(authorisationUri);
            TokenRequest tokenRequestForAuthorisation = new TokenRequest();
            tokenRequestForAuthorisation.setClientId(clientConfig.getClientId());
            tokenRequestForAuthorisation.setClientSecret(clientConfig.getClientSecret());
            tokenRequestForAuthorisation.setScope(SCOPE_ACCOUNT_VALUE);
            tokenRequestForAuthorisation.setCode(authorisationCode);
            tokenRequestForAuthorisation.setGrantType(CLIENT_AUTH_GRANT_TYPE_VALUE);
            TokenResponse tokenResponseForAuthorisation = tokenRemote.generateToken(tokenRequestForAuthorisation);
            return tokenResponseForAuthorisation;
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public String getAuthorisationCode(String authorisationUri) {
        try {
            AuthorisationCode authorisationCode = aispRemote.getAuthorisationCode(authorisationUri);
            String authorisationUrl = authorisationCode.getRedirectUri();
            return StringUtils.substringBetween(authorisationUrl, "code=", "&id_token");
        } catch (HttpStatusCodeException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }

    }

    public String createAuthorizeUri(String consentId) {
        return aispRemote.createAuthorizeUri(consentId);
    }

    public OBReadDataResponse<OBReadAccountList> getAccountResponse() {

        try {
            return aispRemote.getAccountResponse(HttpRequestContext.get());

        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }

    }

    public OBReadDataResponse<OBReadAccountList> getAccountById(String accountId) {
        try {
            return aispRemote.getAccountById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBReadDataResponse<OBReadBalanceList> getBalanceById(String accountId) {

        try {
            return aispRemote.getBalanceById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBReadDataResponse<OBReadTransactionList> getTransactionsById(String accountId) {
        try {
            return aispRemote.getTransactionsById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBReadDataResponse<OBReadDirectDebitList> getDirectDebitsById(String accountId) {
        try {
            return aispRemote.getDirectDebitsById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBReadDataResponse<OBReadStandingOrderList> getStandingOrdersById(String accountId) {
        try {
            return aispRemote.getStandingOrdersById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBReadDataResponse<OBReadProductList> getProductById(String accountId) {

        try {
            return aispRemote.getProductById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }

    public OBReadDataResponse<OBReadBeneficiaryList> getBeneficiariesById(String accountId) {
        try {
            return aispRemote.getBeneficiariesById(accountId, HttpRequestContext.get());
        } catch (HttpClientErrorException ex) {
            logger.error(ex.getResponseBodyAsString(), ex);
            throw ex;
        }
    }


}
