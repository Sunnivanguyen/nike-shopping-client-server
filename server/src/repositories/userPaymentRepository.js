const UserPaymentEntity = require('../entities/userPaymentEntity');

class UserPaymentRepository {
  async createUserPayment(data) {
    const paymentMethod = await UserPaymentEntity.create(data);
    return paymentMethod;
  }

  async getAllUserPayments() {
    const paymentMethods = await UserPaymentEntity.findAll();
    return paymentMethods;
  }
}

module.exports = new UserPaymentRepository();
