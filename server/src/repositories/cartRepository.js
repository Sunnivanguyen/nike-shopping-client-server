const CartEnity = require('../entities/cartEntity');

class CartRepository {
  async createCart({ newUser }) {
    const newCart = await CartEnity.create({
      user_id: +newUser.id,
    });

    return newCart;
  }
}

module.exports = new CartRepository();
