const { BadRequestException } = require('../exceptions');
const UserPaymentRepository = require('../repositories/userPaymentRepository');

class UserPaymentService {
  async createUserPayment(data) {
    try {
      const newUserPayment =
        await UserPaymentRepository.createUserPayment(data);
      if (!newUserPayment) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Could not create payment method',
        );
      }
      const responseData = {
        newUserPayment,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserPayments() {
    try {
      const userPayments = await UserPaymentRepository.getAllUserPayments();
      if (!userPayments) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Could not get payment methods',
        );
      }
      const responseData = {
        userPayments,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserPaymentService();
