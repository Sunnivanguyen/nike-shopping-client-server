const { BadRequestException } = require('../exceptions');

const CategoryRepository = require('../repositories/categoryRepository');

class CategoryService {
  async createCategory({ name }) {
    try {
      const newCategory = await CategoryRepository.createCategory({ name });

      if (!newCategory) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        newCategory,
      };
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      const categories = await CategoryRepository.getAllCategories();

      if (!categories) {
        throw new BadRequestException('Bad Request', 400);
      }

      const responseData = {
        categories,
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();
