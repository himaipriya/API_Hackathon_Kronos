package com.rbs.apihackathonkronos.model.accounts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class OBReadBalanceList {

    @JsonProperty("Balance")
    private List<OBReadBalance> account = null;
}