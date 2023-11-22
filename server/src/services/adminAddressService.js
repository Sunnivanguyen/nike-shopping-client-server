const AdminAddressRepository = require('../repositories/adminAddressRepository');

class AdminAddressService {
  async createAdminAddress({ adminId, data }) {
    try {
      const adminAddresses =
        await AdminAddressRepository.getAllAdminAddresses(adminId);
      const adminDefaultAddress =
        await AdminAddressRepository.getAdminDefaultAddress(adminId);

      //If admin hasn't had any address yet, then the first one is set to default
      const isDefault =
        adminAddresses.length === 0 || !adminDefaultAddress
          ? 1
          : +data.is_default;

      const addressEntity = {
        admin_id: +adminId,
        address_line_1: data.address_line_1,
        address_line_2: data.address_line_2,
        city: data.city,
        region: data.region,
        country: data.country,
        postal_code: data.postal_code,
        longitude: data.longitude,
        latitude: data.latitude,
        is_default: +isDefault,
      };

      const newAddress =
        await AdminAddressRepository.createAdminAddress(addressEntity);

      if (!newAddress) {
        throw new BadRequestException('Bad Request', 400);
      }

      //if this new address is set to default, then the other address's default has to be set to false
      const addressId = newAddress.id;
      if (newAddress.is_default) {
        await AdminAddressRepository.updateAdminAddressDefault({
          addressId,
          adminId,
        });
      }

      const responseData = {
        newAddress,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdminAddresses(adminId) {
    try {
      const adminAddresses =
        await AdminAddressRepository.getAllAdminAddresses(adminId);

      if (!adminAddresses) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        adminAddresses,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminAddress(adminAddressEntity) {
    try {
      const updatedAddress =
        await AdminAddressRepository.updateAdminAddress(adminAddressEntity);

      //If the the current address is set to default, set other address to 0
      const adminId = adminAddressEntity.admin_id;
      const addressId = adminAddressEntity.id;
      if (updatedAddress.is_default) {
        await AdminAddressRepository.updateAdminAddressDefault({
          addressId,
          adminId,
        });
      }

      const adminAddresses =
        await AdminAddressRepository.getAllAdminAddresses(adminId);

      const adminDefaultAddresses =
        await AdminAddressRepository.getAdminDefaultAddress(adminId);

      //If admin has at least 1 address then check if there is no default address, if true set the first address to true
      if (adminAddresses.length > 0 && adminDefaultAddresses === null) {
        await AdminAddressRepository.setFirstAddressToDefault(
          adminAddresses[0],
        );
      }

      const currentAddress =
        await AdminAddressRepository.getCurrentAdminAddress(addressId);

      if (!updatedAddress) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        currentAddress,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentAdminAddress(addressId) {
    try {
      const adminAddress =
        await AdminAddressRepository.getCurrentAdminAddress(addressId);

      if (!adminAddress) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        adminAddress,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdminAddress(addressId) {
    try {
      const deletedAddress =
        await AdminAddressRepository.deleteAdminAddress(addressId);

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

module.exports = new AdminAddressService();
