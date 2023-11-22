const OrderDetailEntity = require('../entities/orderDetailEntity');

class OrderDetailRepository {
  async createOrderItem({ orderId, productId, quantityOrdered, productSize }) {
    const newOrderItem = await OrderDetailEntity.create({
      order_id: +orderId,
      product_id: productId,
      quantity_ordered: quantityOrdered,
      product_size: productSize,
    });

    return newOrderItem;
  }

  async getAllOrderItems(orderId) {
    const orderItems = await OrderDetailEntity.findAll({
      where: { order_id: +orderId },
    });

    return orderItems;
  }
}

module.exports = new OrderDetailRepository();
