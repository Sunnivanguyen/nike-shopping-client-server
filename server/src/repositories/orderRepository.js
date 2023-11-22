// const { or } = require('sequelize');
const OrderDetailEntity = require('../entities/orderDetailEntity');
const OrderEntity = require('../entities/orderEntity');

class OrderRepository {
  async createOrder(orderEntity) {
    const order = await OrderEntity.create(orderEntity);
    return order;
  }

  async createOrderItems(orderItemEntites) {
    const orderItems = await OrderDetailEntity.bulkCreate(orderItemEntites);
    return orderItems;
  }

  async getAllOrders() {
    const orders = await OrderEntity.findAll();
    return orders;
  }

  async getUserOrder(orderId) {
    const order = await OrderEntity.findByPk(+orderId);

    return order;
  }

  async getAllOrderItems(orderId) {
    const orderItems = await OrderDetailEntity.findAll({
      where: { order_id: +orderId },
    });

    console.log(orderItems);

    return orderItems;
  }

  async updateOrder(orderEntity) {
    const updatedOrder = await OrderEntity.update(orderEntity, {
      where: { id: +orderEntity.id },
    });
    return updatedOrder;
  }

  async getAllUserOrders(userId) {
    const userOrders = await OrderEntity.findAll({
      where: { user_id: +userId },
    });

    return userOrders;
  }

  async deleteOrder(orderId) {
    const deletedOrder = await OrderEntity.destroy({ where: { id: +orderId } });

    return deletedOrder;
  }
}

module.exports = new OrderRepository();
