package com.rbs.apihackathonkronos.controller;


import com.rbs.apihackathonkronos.model.accounts.*;
import com.rbs.apihackathonkronos.model.token.TokenResponse;
import com.rbs.apihackathonkronos.service.AispService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.rbs.apihackathonkronos.client.common.Endpoints.*;


@RestController
@RequestMapping("/open-banking/*/aisp")
public class AispController {

    private AispService aispService;

    @Autowired
    public AispController(AispService aispService) {
        this.aispService = aispService;
    }

    @GetMapping(value = OB_JOURNEY_INIT)
    public ResponseEntity<TokenResponse> initialize() {
        TokenResponse tokenResponse = aispService.initialize();
        return new ResponseEntity<>(tokenResponse, HttpStatus.CREATED);
    }

    @GetMapping(value = ACCOUNT_LIST_ENDPOINT)
    public OBReadDataResponse<OBReadAccountList> getAccounts() {
        return aispService.getAccountResponse();
    }

    @GetMapping(value = ACCOUNT_ID_ENDPOINT)
    public OBReadDataResponse<OBReadAccountList> getAccountById(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getAccountById(accountId);
    }

    @GetMapping(value = ACCOUNT_ID_BALANCES_ENDPOINT)
    public OBReadDataResponse<OBReadBalanceList> getBalance(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getBalanceById(accountId);
    }

    @GetMapping(value = ACCOUNT_ID_TRANSACTIONS_ENDPOINT)
    public OBReadDataResponse<OBReadTransactionList> getTransactions(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getTransactionsById(accountId);
    }

    @GetMapping(value = ACCOUNT_ID_BENEFICIARIES_ENDPOINT)
    public OBReadDataResponse<OBReadBeneficiaryList> getBeneficiaries(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getBeneficiariesById(accountId);
    }

    @GetMapping(value = ACCOUNT_ID_DIRECT_DEBITS_ENDPOINT)
    public OBReadDataResponse<OBReadDirectDebitList> getDirectDebitsById(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getDirectDebitsById(accountId);
    }

    @GetMapping(value = ACCOUNT_ID_STANDING_ORDERS_ENDPOINT)
    public OBReadDataResponse<OBReadStandingOrderList> getStandingOrderById(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getStandingOrdersById(accountId);
    }

    @GetMapping(value = ACCOUNT_ID_PRODUCT_ENDPOINT)
    public OBReadDataResponse<OBReadProductList> getProductById(
            @PathVariable(value = "accountId") String accountId) {
        return aispService.getProductById(accountId);
    }
}