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
public class OBReadBeneficiary {

    @JsonProperty("AccountId")
    private String accountId;

    @JsonProperty("BeneficiaryId")
    private String beneficiaryId;

    @JsonProperty("CreditorAccount")
    private OBReadCreditorAccount creditorAccount;

    @JsonProperty("Reference")
    private String reference;

    @JsonProperty("CreditorAgent")
    private OBReadCreditorAgent creditorAgent;
}