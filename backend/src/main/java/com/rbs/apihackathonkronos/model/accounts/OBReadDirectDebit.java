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
public class OBReadDirectDebit {

    @JsonProperty("AccountId")
    private String accountId;

    @JsonProperty("MandateIdentification")
    private String mandateIdentification;

    @JsonProperty("DirectDebitStatusCode")
    private String directDebitStatusCode;

    @JsonProperty("Name")
    private String name;

    @JsonProperty("PreviousPaymentDateTime")
    private String previousPaymentDateTime;

    @JsonProperty("PreviousPaymentAmount")
    private OBReadPreviousPaymentAmount previousPaymentAmount;
}

