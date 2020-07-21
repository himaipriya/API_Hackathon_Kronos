package com.rbs.apihackathonkronos.controller;


import com.rbs.apihackathonkronos.model.payments.OBWriteDomestic;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticConsent;
import com.rbs.apihackathonkronos.model.payments.OBWriteDomesticResponse;
import com.rbs.apihackathonkronos.model.token.TokenResponse;
import com.rbs.apihackathonkronos.service.PispService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.rbs.apihackathonkronos.client.common.Endpoints.*;


@RestController
@RequestMapping("/open-banking/*/pisp")
public class PispController {

    private PispService pispService;

    @Autowired
    public PispController(PispService pispService) {
        this.pispService = pispService;
    }

    @PostMapping(value = OB_JOURNEY_INIT)
    public ResponseEntity<TokenResponse> initialize(@RequestBody OBWriteDomesticConsent obWriteDomesticConsent) throws Exception {
        TokenResponse tokenResponse = pispService.initialize(obWriteDomesticConsent);
        return new ResponseEntity<>(tokenResponse, HttpStatus.CREATED);
    }

    @PostMapping(value = DOMESTIC_PAYMENTS_ENDPOINT)
    public ResponseEntity<OBWriteDomesticResponse> submitPayments(@RequestBody(required = false) OBWriteDomestic obWriteDomestic2) throws Exception {
        OBWriteDomesticResponse paymentsSubmit = pispService.createDomesticPayment(obWriteDomestic2);
        return new ResponseEntity<>(paymentsSubmit, HttpStatus.CREATED);
    }

    @GetMapping(value = DOMESTIC_PAYMENTS_PAYMENT_ID_ENDPOINT)
    public OBWriteDomesticResponse getPaymentStatus(@PathVariable(value = "paymentId") String paymentId) {
        return pispService.getPaymentStatus(paymentId);
    }
}