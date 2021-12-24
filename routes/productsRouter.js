const express = require('express');

const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const router = express.Router();
const services = new ProductsService();

router.get('/', async (req, res) => {
  const products = await services.find();
  res.json(products);
});

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await services.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await services.create(body)
    res.status(201).json(newProduct)
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const productChange = await services.update(id, body)
      res.json(productChange)
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await services.delete(id);
  res.status(500).json({
    deleteProduct
  })

})

module.exports = router;
