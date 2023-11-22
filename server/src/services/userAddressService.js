const UserAddressRepository = require('../repositories/userAddressRepository');
const { BadRequestException } = require('../exceptions/index');

class UserAddressService {
  async createUserAddress({ userId, data }) {
    try {
      const userAddresses =
        await UserAddressRepository.getAllUserAddresses(userId);
      const userDefaultAddress =
        await UserAddressRepository.getUserDefaultAddress(userId);

      //If user hasn't had any address yet, then the first one is set to default
      const isDefault =
        userAddresses.length === 0 || !userDefaultAddress
          ? 1
          : +data.is_default;

      const addressEntity = {
        user_id: +userId,
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
        await UserAddressRepository.createUserAddress(addressEntity);

      if (!newAddress) {
        throw new BadRequestException('Bad Request', 400);
      }

      //if this new address is set to default, then the other address's default has to be set to false
      const addressId = newAddress.id;
      if (newAddress.is_default) {
        await UserAddressRepository.updateUserAddressDefault({
          userId,
          addressId,
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

  async getAllUserAddresses(userId) {
    try {
      const userAddresses =
        await UserAddressRepository.getAllUserAddresses(userId);

      if (!userAddresses) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        userAddresses,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async updateUserAddress(userAddressEnity) {
    try {
      const updatedAddress =
        await UserAddressRepository.updateUserAddress(userAddressEnity);

      //If the the current address is set to default, set other addresses to 0
      const userId = userAddressEnity.user_id;
      const addressId = userAddressEnity.id;
      if (userAddressEnity.is_default) {
        await UserAddressRepository.updateUserAddressDefault({
          userId,
          addressId,
        });
      }

      const userAddresses =
        await UserAddressRepository.getAllUserAddresses(userId);

      const userDefaultAddresses =
        await UserAddressRepository.getUserDefaultAddress(userId);

      //If user has at least 1 address then check if there is no default address, if true set the first address to true
      if (userAddresses.length > 0 && userDefaultAddresses === null) {
        await UserAddressRepository.setFirstAddressToDefault(userAddresses[0]);
      }

      const currentAddress =
        await UserAddressRepository.getCurrentUserAddress(addressId);

      if (!updatedAddress) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        updatedAddress,
        currentAddress,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUserAddress(addressId) {
    try {
      const userAddress =
        await UserAddressRepository.getCurrentUserAddress(addressId);

      if (!userAddress) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        userAddress,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserAddress(addressId) {
    try {
      const deletedAddress =
        await UserAddressRepository.deleteUserAddress(addressId);

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

module.exports = new UserAddressService();
