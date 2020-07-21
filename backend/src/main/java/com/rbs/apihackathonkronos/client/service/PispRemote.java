package com.rbs.apihackathonkronos.client.service;


import com.rbs.apihackathonkronos.client.common.Endpoints;
import com.rbs.apihackathonkronos.client.util.PispUtils;
import com.rbs.apihackathonkronos.model.common.AuthorisationCode;
import com.rbs.apihackathonkronos.model.common.HttpRequestHeader;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomestic;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticConsent;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticConsentResponse;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

public class PispRemote {

    private static final Logger logger = LoggerFactory.getLogger(PispRemote.class);

    private RestTemplate sslRestTemplate;
    private PispUtils pispUtil;

    public PispRemote(RestTemplate sslRestTemplate, PispUtils pispUtil) {
        this.sslRestTemplate = sslRestTemplate;
        this.pispUtil = pispUtil;
    }

    public OBWriteDomesticConsentResponse createPaymentConsent(OBWriteDomesticConsent obWriteDomesticConsent2, HttpRequestHeader httpRequestHeader) {

        return sslRestTemplate.exchange(
                pispUtil.getUri(Endpoints.DOMESTIC_PAYMENT_CONSENTS_ENDPOINT),
                HttpMethod.POST,
                pispUtil.createRequest(obWriteDomesticConsent2, httpRequestHeader),
                OBWriteDomesticConsentResponse.class).getBody();

    }

    public String createAuthorizeUri(String consentId) {
       return  pispUtil.createAuthorizeUrl(consentId);
    }

    public OBWriteDomesticResponse createDomesticPayment(OBWriteDomestic obWriteDomestic2, HttpRequestHeader httpRequestHeader) {

        return sslRestTemplate.exchange(
                pispUtil.getUri(Endpoints.DOMESTIC_PAYMENTS_ENDPOINT),
                HttpMethod.POST,
                pispUtil.createRequest(obWriteDomestic2, httpRequestHeader),
                OBWriteDomesticResponse.class).getBody();

    }

    public OBWriteDomesticResponse getPaymentStatus(String paymentId,  HttpRequestHeader httpRequestHeader) {

        return  sslRestTemplate.exchange(
                pispUtil.getUri(Endpoints.DOMESTIC_PAYMENTS_PAYMENT_ID_ENDPOINT),
                HttpMethod.GET,
                pispUtil.createRequest(null, httpRequestHeader),
                OBWriteDomesticResponse.class,
                paymentId).getBody();

    }

    public AuthorisationCode getAuthorisationCode(String authorisationUri) {
        return sslRestTemplate.getForEntity(authorisationUri, AuthorisationCode.class).getBody();
    }
}