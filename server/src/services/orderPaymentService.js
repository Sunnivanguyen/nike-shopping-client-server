const { BadRequestException } = require('../exceptions');
const OrderPaymentRepository = require('../repositories/orderPaymentRepository');

class PaymentService {
  async createOrderPayment(data) {
    try {
      const newPaymentMethod =
        await OrderPaymentRepository.createOrderPayment(data);
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

  async getOrderPayment(orderPaymentId) {
    try {
      const orderPayment =
        await OrderPaymentRepository.getOrderPayment(orderPaymentId);
      if (!orderPayment) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Could not get payment methods',
        );
      }
      const responseData = {
        orderPayment,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PaymentService();
