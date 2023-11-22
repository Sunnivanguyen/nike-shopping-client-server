//const { Op } = require('sequelize');
const CartItemEntity = require('../entities/cartItemEntity');

class CartItemRepository {
  async createCartItem(cartItemEntity) {
    const newCartItem = await CartItemEntity.create(cartItemEntity);
    return newCartItem;
  }

  async updateCartItem(cartItemEntity) {
    const updatedCartItem = await CartItemEntity.update(cartItemEntity, {
      where: { id: +cartItemEntity.id },
    });

    return updatedCartItem;
  }

  async getAllCartItems() {
    const cartItems = await CartItemEntity.findAll();
    return cartItems;
  }

  async getCartItemsByProductId({ userId, productId }) {
    const cartItems = await CartItemEntity.findOne({
      where: { user_id: +userId, product_id: +productId },
    });

    return cartItems;
  }

  async getUserCartItems(userId) {
    const userCartItem = await CartItemEntity.findAll({
      where: { user_id: +userId },
    });
    return userCartItem;
  }

  async getCartItem(cartItemId) {
    const cartItem = await CartItemEntity.findByPk(+cartItemId);
    return cartItem;
  }

  async deleteCartItem(cartItemId) {
    const deletedCartItem = await CartItemEntity.destroy({
      where: { id: +cartItemId },
    });
    return deletedCartItem;
  }
}

module.exports = new CartItemRepository();
