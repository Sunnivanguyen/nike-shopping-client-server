const CategoryEntity = require('../entities/categoryEntity');

class CategoryRepository {
  async createCategory({ name }) {
    const newCategory = await CategoryEntity.create({ name: name });

    return newCategory;
  }

  async getAllCategories() {
    const categories = await CategoryEntity.findAll();

    return categories;
  }
}

module.exports = new CategoryRepository();
