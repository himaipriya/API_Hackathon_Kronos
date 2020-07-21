package com.rbs.apihackathonkronos.model.accounts;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@RequiredArgsConstructor
public class OBReadStandingOrder {

    @JsonProperty("AccountId")
    private String accountId;

    @JsonProperty("Frequency")
    private String frequency;

    @JsonProperty("Reference")
    private String reference;

    @JsonProperty("FirstPaymentDateTime")
    private String firstPaymentDateTime;

    @JsonProperty("NextPaymentDateTime")
    private String nextPaymentDateTime;

    @JsonProperty("FinalPaymentDateTime")
    private String finalPaymentDateTime;

    @JsonProperty("StandingOrderStatusCode")
    private String standingOrderStatusCode;

    @JsonProperty("FirstPaymentAmount")
    private OBReadFirstPaymentAmount firstPaymentAmount;

    @JsonProperty("NextPaymentAmount")
    private OBReadNextPaymentAmount nextPaymentAmount;

    @JsonProperty("FinalPaymentAmount")
    private OBReadFinalPaymentAmount finalPaymentAmount;

    @JsonProperty("CreditorAccount")
    private OBReadCreditorAccount creditorAccount;
}