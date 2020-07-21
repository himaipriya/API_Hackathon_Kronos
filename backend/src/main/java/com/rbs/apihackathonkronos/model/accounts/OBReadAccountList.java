package com.rbs.apihackathonkronos.model.accounts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@RequiredArgsConstructor
@Getter
@Setter
public class OBReadAccountList {

    @JsonProperty("Account")
    private List<OBReadAccountInformation> account = null;

}