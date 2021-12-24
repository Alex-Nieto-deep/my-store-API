const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {

  constructor() {
    this.categories = [];
    this.generateCategories();
  }

  generateCategories() {
    const limite = 10;
    for (let index = 0; index < limite; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
      })
    }
  }

  create(body) {
    const newCategory = ({
      id: faker.datatype.uuid(),
      ...body
    })
    this.categories.push(newCategory);
    return newCategory;
  }

  find(name = null) {
    if (name) {
      const category = this.categories.find(item => item.name === name);
      if (!category) {
        throw boom.notFound('Category not found');
      }
      return category;
    }
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }


  update(id, changes) {
    const indexCategory = this.categories.findIndex(item => item.id === id);
    const category = this.categories[indexCategory];
    return this.categories[indexCategory] = {
      ...category,
      ...changes,
    }
  }

  delete(id) {
    const indexCategory = this.categories.findIndex(item => item.id === id);
    delete this.categories[indexCategory]
    return { message: "Delete Category", id }
  }
}

module.exports = CategoriesService;
