package com.rbs.apihackathonkronos.model.accounts;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.rbs.apihackathonkronos.model.common.Links;
import com.rbs.apihackathonkronos.model.common.Meta;
import com.rbs.apihackathonkronos.model.payments.OBRisk;

public class OBReadDomesticConsentResponse {

    @JsonProperty("Data")
    private OBReadDataDomesticConsentResponse data = null;

    @JsonProperty("Risk")
    private OBRisk risk = null;

    @JsonProperty("Links")
    private Links links = null;

    @JsonProperty("Meta")
    private Meta meta = null;

    public OBReadDataDomesticConsentResponse getData() {
        return data;
    }

    public OBRisk getRisk() {
        return risk;
    }

    public Links getLinks() {
        return links;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setData(OBReadDataDomesticConsentResponse data) {
        this.data = data;
    }

    public void setRisk(OBRisk risk) {
        this.risk = risk;
    }

    public void setLinks(Links links) {
        this.links = links;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }
}