const { BadRequestException } = require('../exceptions');
const PaymentMethodRepository = require('../repositories/paymentMethodRepository');

class PaymentService {
  async createPaymentMethod(data) {
    try {
      const newPaymentMethod =
        await PaymentMethodRepository.createPaymentMethod(data);
      if (!newPaymentMethod) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Could not create payment method',
        );
      }
      const responseData = {
        newPaymentMethod,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllOrderPayments(userPaymentId) {
    try {
      const paymentMethods =
        await PaymentMethodRepository.getAllOrderPayments(userPaymentId);
      if (!paymentMethods) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Could not get payment methods',
        );
      }
      const responseData = {
        paymentMethods,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PaymentService();
