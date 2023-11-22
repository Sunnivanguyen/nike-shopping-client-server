const BankAccountService = require('../services/bankAccountService');

exports.createBankAccount = async (req, res, next) => {
  const data = req.body;
  const result = await BankAccountService.createBankAccount(data);

  req.result = result;

  next();
};

exports.getBankAccount = async (req, res, next) => {
  const bankAccountId = req.params.bank_account_id;
  const result = await BankAccountService.getBankAccount(bankAccountId);

  req.result = result;

  next();
};
