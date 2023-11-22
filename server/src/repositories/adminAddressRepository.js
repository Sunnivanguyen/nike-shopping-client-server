const { Op } = require('sequelize');
const AdminAddressEntity = require('../entities/adminAddressEntity');

class AdminAddressRepository {
  async createAdminAddress(addresEntity) {
    const newAddress = await AdminAddressEntity.create(addresEntity);
    return newAddress;
  }

  async updateAdminAddressDefault({ addressId, adminId }) {
    await AdminAddressEntity.update(
      {
        is_default: 0,
      },
      { where: { admin_id: +adminId, id: { [Op.ne]: +addressId } } },
    );
  }

  async updateAdminAddress(adminAddressEntity) {
    const updatedAddress = await AdminAddressEntity.update(adminAddressEntity, {
      where: {
        admin_id: +adminAddressEntity.admin_id,
        id: +adminAddressEntity.id,
      },
    });

    return updatedAddress;
  }

  async getAllAdminAddresses(adminId) {
    const adminAddresses = await AdminAddressEntity.findAll({
      where: { admin_id: +adminId },
    });

    return adminAddresses;
  }

  async getAdminDefaultAddress(adminId) {
    const adminDefaultAddresses = await AdminAddressEntity.findOne({
      where: { is_default: 1, admin_id: +adminId },
    });

    return adminDefaultAddresses;
  }

  async getCurrentAdminAddress(addressId) {
    const currentAddress = await AdminAddressEntity.findByPk(+addressId);
    return currentAddress;
  }

  async setFirstAddressToDefault(firtsAdminAddress) {
    const updatedFirstArress = await AdminAddressEntity.update(
      { ...firtsAdminAddress, is_default: 1 },
      { where: { admin_id: +firtsAdminAddress.admin_id } },
    );
    return updatedFirstArress;
  }

  async deleteAdminAddress(addressId) {
    const deletedAddress = await AdminAddressEntity.destroy({
      where: { id: +addressId },
    });

    return deletedAddress;
  }
}

module.exports = new AdminAddressRepository();
