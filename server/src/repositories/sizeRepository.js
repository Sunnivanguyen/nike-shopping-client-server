const SizeEntity = require('../entities/sizeEntity');

class SizeRepository {
  async createSize({ size }) {
    const newSize = await SizeEntity.create({ size });

    return newSize;
  }

  async getAllSizes() {
    const sizes = await SizeEntity.findAll();

    return sizes;
  }
}

module.exports = new SizeRepository();
