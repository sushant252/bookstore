const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
router.post('/admin/login', (req, res) => {
  UserController.doAdminLogin(req, res)  
})
router.get('/users', (req, res) => {
  UserController.getUser(req, res)
})

module.exports = router