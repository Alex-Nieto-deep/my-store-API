const express = require('express');

const CategoriesService = require('../services/categoriesService');
const validatorHandler = require('../middlewares/validatorHandler')
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categoriesSchema');

const router = express.Router();
const services = new CategoriesService();

router.get('/', (req, res) => {
  const { name } = req.query;
  const categories = services.find(name);
  res.status(200).json({
    categories
  });
})

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  (req, res) => {
    const body = req.body;
    const newCategory = services.create(body)
    return res.status(201).json({
      newCategory
    })
  }
)

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await services.findOne(id);
      res.json(category)
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const categoryChange = services.update(id, body)
    res.json(categoryChange);
  }
)

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const categoryDelete = services.delete(id)
    res.json(categoryDelete);
  }
)

module.exports = router;
