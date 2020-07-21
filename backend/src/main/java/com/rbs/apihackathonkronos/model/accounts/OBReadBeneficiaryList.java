package com.rbs.apihackathonkronos.model.accounts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class OBReadBeneficiaryList {

    @JsonProperty("Beneficiary")
    private List<OBReadBeneficiary> beneficiaryList = null;
}