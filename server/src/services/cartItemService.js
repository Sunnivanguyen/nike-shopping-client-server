const { BadRequestException } = require('../exceptions');
const CartItemRepository = require('../repositories/cartItemRepository');

class CartItemService {
  async createCartItem(data) {
    const productId = data.product_id;

    try {
      //Get currents card item
      const currentUserCards = await CartItemRepository.getUserCartItems(
        data.user_id,
      );

      const dataCurrentUserCards = currentUserCards.map((card) => {
        return card.dataValues;
      });

      let cartItem;

      //If there is already card items
      if (dataCurrentUserCards.length > 0) {
        //Find if the product is already in the cart, just update the quantity
        cartItem = dataCurrentUserCards.find(
          (cart) => cart.product_id === productId,
        );
      }

      if (cartItem && cartItem.product_size === data.product_size) {
        const cartItemEntity = {
          ...cartItem,
          quantity_ordered: +data.quantity_ordered,
        };
        const responseData =
          await CartItemRepository.updateCartItem(cartItemEntity);
        if (!responseData) {
          throw new BadRequestException('Bad Request', 400);
        }
        return responseData;
      } else {
        const cartItemEntity = {
          user_id: +data.user_id,
          product_id: +data.product_id,
          product_code: data.product_code,
          product_name: data.product_name,
          quantity_ordered: +data.quantity_ordered,
          product_size: +data.product_size,
          product_color: data.product_color,
          buy_price: +data.buy_price,
          sex: data.sex,
        };
        const newCartItem =
          await CartItemRepository.createCartItem(cartItemEntity);
        if (!newCartItem) {
          throw new BadRequestException('Bad Request', 400);
        }
        return newCartItem;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCartItem(data) {
    const cartItemEntity = {
      user_id: +data.user_id,
      product_id: +data.product_id,
      product_code: data.product_code,
      product_name: data.product_name,
      quantity_ordered: +data.quantity_ordered,
      product_size: +data.product_size,
      product_color: data.product_color,
      buy_price: +data.buy_price,
      sex: data.sex,
    };
    console.log(cartItemEntity, 'CART ITEM ENTITY');

    try {
      const responseData =
        await CartItemRepository.updateCartItem(cartItemEntity);
      console.log(responseData, 'RESPONSE DATA');
      if (responseData[0] !== 1) {
        throw new BadRequestException('Bad Request', 400, "Can't update item");
      }
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllCartItems(userId) {
    try {
      const userCartItems = await CartItemRepository.getUserCartItems(userId);

      if (!userCartItems) {
        throw new BadRequestException(
          'Bad Request',
          400,
          "Something wrong with getting user's cart items",
        );
      }

      const responseData = {
        userCartItems,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  // async getAllCartItemsByCartId({ cartId }) {
  //   const cartItems = await CartItemRepository.findAll({
  //     where: { cart_id: +cartId },
  //   });

  //   if (!cartItems) {
  //     const result = {
  //       statusCode: 400,
  //       status: 'fail',
  //       message: 'Bad Request',
  //     };
  //     return result;
  //   }

  //   const result = {
  //     statusCode: 201,
  //     status: 'success',
  //     data: {
  //       product: cartItems,
  //     },
  //   };

  //   return result;
  // }

  async getCartItem(cartItemId) {
    try {
      const cartItem = await CartItemRepository.getCartItem(cartItemId);

      if (!cartItem) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Something wrong with getting cart item',
        );
      }

      const responseData = {
        cartItem,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartItem(cartItemId) {
    try {
      const deletedCartItem =
        await CartItemRepository.deleteCartItem(cartItemId);
      console.log(deletedCartItem, 'DELETED CART ITEM');
      if (deletedCartItem !== 1) {
        throw new BadRequestException(
          'Bad Request',
          400,
          'Something wrong with deleting cart item',
        );
      }

      const responseData = {
        deletedCartItem,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartItemService();
