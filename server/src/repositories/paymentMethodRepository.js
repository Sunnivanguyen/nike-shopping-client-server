const PaymentMethodEntity = require('../entities/paymentMethodEntity');

class OrderPaymentRepository {
  async createPaymentMethod(data) {
    const paymentMethod = await PaymentMethodEntity.create(data);
    return paymentMethod;
  }

  async getAllPaymentMethods() {
    const paymentMethods = await PaymentMethodEntity.findAll();
    return paymentMethods;
  }
}

module.exports = new OrderPaymentRepository();
