const OrderRepository = require('../repositories/orderRepository');

const OrderDetailRepository = require('../repositories/orderDetailRepository');
const { BadRequestException, NotFoundException } = require('../exceptions');

class OrderService {
  async createOrder(data) {
    const orderEntity = {
      user_id: data.id,
      status: +data.status,
      delivery_fee: data.delivery_fee,
      comment: data.comment,
      payment_date: Date.now(),
    };
    try {
      const newOrder = await OrderRepository.createOrder(orderEntity);

      const orderItems = data.carts.map((cartItem) => {
        return {
          order_id: newOrder.id,
          product_id: cartItem.product_id,
          quantity_ordered: cartItem.quantity_ordered,
          product_size: cartItem.product_size,
        };
      });

      const newOrderItems = await OrderRepository.createOrderItems(orderItems);

      if (!newOrder && !newOrderItems) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Something wrong with creating order',
        );
      }

      const responseData = {
        newOrder,
        newOrderItems,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserOrders(userId) {
    async function loopThroughOrders(userOrders) {
      const orderItems = await Promise.all(
        userOrders.map(async (order) => {
          const orderItems = await OrderDetailRepository.getAllOrderItems(
            order.id,
          );
          return {
            order,
            orderItems,
          };
        }),
      );

      return orderItems;
    }
    try {
      const userOrders = await OrderRepository.getAllUserOrders(userId);

      if (userOrders && userOrders.length > 0) {
        const orderItems = await loopThroughOrders(userOrders);
        const responseData = {
          orderItems,
        };

        console.log(userOrders, 'USER ORDERS');
        console.log(orderItems, 'ORDER ITEMS');
        return responseData;
      }

      if (userOrders.length === 0 || orderItems.length === 0) {
        throw new NotFoundException('Bad Request', 400, 'User Order Not Found');
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserOrder(orderId) {
    try {
      const order = await OrderRepository.getUserOrder(orderId);

      const orderItems = await OrderRepository.getAllOrderItems(orderId);
      console.log(order, 'ORDER');
      console.log(orderItems, 'ORDER ITEMS');

      if (!order) {
        throw new BadRequestException(
          'Bad Request',
          400,
          "Something wrong with getting user's order",
        );
      }
      const responseData = {
        order,
        orderItems,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(data) {
    const orderEntity = {
      id: data.id,
      order_code: data.order_code,
      user_id: data.user_id,
      status: +data.status,
      delivery_fee: data.delivery_fee,
      comment: data.comment,
      payment_date: data.payment_date,
    };

    console.log(orderEntity, 'ORDER ENTITY');

    try {
      const updatedOrder = await OrderRepository.updateOrder(orderEntity);

      if (updatedOrder[0] !== 1) {
        throw new BadRequestException('Bad Request', 400, 'Something wrong');
      }

      const responseData = {
        updatedOrder,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const deletedAddress = await OrderRepository.deleteOrder(orderId);

      if (deletedAddress !== 1) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        deletedAddress,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderService();
