package com.rbs.apihackathonkronos.model.accounts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@RequiredArgsConstructor
public class OBReadStandingOrderList {

    @JsonProperty("StandingOrder")
    private List<OBReadStandingOrder> standingOrderList = null;
}