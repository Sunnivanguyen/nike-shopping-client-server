const BankAccountRepository = require('../repositories/bankAccountRepository');

class BankAccountService {
  async createBankAccount({ data }) {
    try {
      const newBankAccount = await BankAccountRepository.createBankAccount({
        data,
      });

      const result = {
        statusCode: 201,
        status: 'success',
        data: { newBankAccount },
      };

      return result;
    } catch (error) {
      const result = {
        statusCode: 400,
        status: 'fail',
        message: error.message,
      };
      return result;
    }
  }
}

module.exports = new BankAccountService();
