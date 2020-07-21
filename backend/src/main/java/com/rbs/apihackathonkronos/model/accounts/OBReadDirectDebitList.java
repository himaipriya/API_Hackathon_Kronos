package com.rbs.apihackathonkronos.model.accounts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@RequiredArgsConstructor
public class OBReadDirectDebitList {

    @JsonProperty("DirectDebit")
    private List<OBReadDirectDebit> directDebitList = null;
}

