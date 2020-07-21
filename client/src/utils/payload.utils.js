export const construcPSTokenPayload = (debitAccount, creditAccount) => {
  return {
    Data: {
      Initiation: {
        InstructionIdentification: "instr-identification",
        EndToEndIdentification: "e2e-identification",
        InstructedAmount: {
          Amount: "50.00",
          Currency: "GBP",
        },
        DebtorAccount: debitAccount.Account[0],
        CreditorAccount: creditAccount.Account[0],
      },
    },
    Risk: {
      PaymentContextCode: "EcommerceGoods",
      MerchantCategoryCode: null,
      MerchantCustomerIdentification: null,
      DeliveryAddress: null,
    },
  };
};

export const constructPaymentPayload = (
  debitAccount,
  creditAccount,
  amount,
  ConsentId
) => {
  return {
    Data: {
      ConsentId,
      Initiation: {
        InstructionIdentification: "instr-identification",
        EndToEndIdentification: "e2e-identification",
        InstructedAmount: {
          Amount: amount,
          Currency: "GBP",
        },
        DebtorAccount: debitAccount.Account[0],
        CreditorAccount: creditAccount.Account[0],
      },
    },
    Risk: {
      PaymentContextCode: "EcommerceGoods",
      MerchantCategoryCode: null,
      MerchantCustomerIdentification: null,
      DeliveryAddress: null,
    },
  };
};
