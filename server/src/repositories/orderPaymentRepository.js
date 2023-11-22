const OrderPaymentEntity = require('../entities/orderPaymentEntity');

class OrderPaymentRepository {
  async createOrderPayment(data) {
    const paymentMethod = await OrderPaymentEntity.create(data);
    return paymentMethod;
  }

  async getOrderPayment(userPaymentId) {
    const orderPayment = await OrderPaymentEntity.findByPk(userPaymentId);
    return orderPayment;
  }
}

module.exports = new OrderPaymentRepository();
