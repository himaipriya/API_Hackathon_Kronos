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
public class OBReadProduct {

    @JsonProperty("ProductName")
    private String productName;

    @JsonProperty("ProductId")
    private String productId;

    @JsonProperty("AccountId")
    private String accountId;

    @JsonProperty("ProductType")
    private String productType;
}