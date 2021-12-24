const express = require('express');
const router = express.Router();

const UsersService = require('../services/usersService');
const services = new UsersService();
// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });

router.get('/', function (req, res) {
  const users = services.find();
  res.json(users);
})

router.post('/', function (req, res) {
  const body = req.body;
  const newUser = services.register(body)
  res.status(201).json(newUser);
})



module.exports = router;
