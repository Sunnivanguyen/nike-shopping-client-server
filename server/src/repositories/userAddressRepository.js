const { Op } = require('sequelize');
const UserAddressEntity = require('../entities/userAddressEntity');

class UserAddressRepository {
  async createUserAddress(addresEntity) {
    const newAddress = await UserAddressEntity.create(addresEntity);
    return newAddress;
  }

  async updateUserAddressDefault({ userId, addressId }) {
    await UserAddressEntity.update(
      { is_default: 0 },
      {
        where: { user_id: +userId, id: { [Op.ne]: +addressId } },
      },
    );
  }

  async updateUserAddress(userAddressEntity) {
    const updatedAddress = await UserAddressEntity.update(userAddressEntity, {
      where: { user_id: +userAddressEntity.user_id, id: +userAddressEntity.id },
    });

    return updatedAddress;
  }

  async getAllUsersAddresses() {
    const userAddresses = await UserAddressEntity.findAll();

    return userAddresses;
  }

  async getAllUserAddresses(userId) {
    const userAddresses = await UserAddressEntity.findAll({
      where: { user_id: +userId },
    });

    return userAddresses;
  }

  async getUserDefaultAddress(userId) {
    const userDefaultAddress = await UserAddressEntity.findOne({
      where: { is_default: 1, user_id: +userId },
    });

    return userDefaultAddress;
  }

  async getCurrentUserAddress(addressId) {
    const currentAddress = await UserAddressEntity.findByPk(+addressId);
    return currentAddress;
  }

  async setFirstAddressToDefault(firtsUserAddress) {
    const updatedFirstArress = await UserAddressEntity.update(
      { ...firtsUserAddress, is_default: 1 },
      { where: { user_id: +firtsUserAddress.user_id } },
    );
    return updatedFirstArress;
  }

  async deleteUserAddress(addressId) {
    const deletedAddress = await UserAddressEntity.destroy({
      where: {
        id: +addressId,
      },
    });
    return deletedAddress;
  }
}

module.exports = new UserAddressRepository();
