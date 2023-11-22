const { BadRequestException } = require('../exceptions');
const SizeRepository = require('../repositories/sizeRepository');

class SizeService {
  async createSize({ size }) {
    try {
      const newSize = await SizeRepository.createSize({ size });
      if (!newSize) {
        throw new BadRequestException('Bad Request', 400);
      }
      const responseData = {
        newSize,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllSizes() {
    try {
      const sizes = await SizeRepository.getAllSizes();

      if (!sizes) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        sizes,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new SizeService();
