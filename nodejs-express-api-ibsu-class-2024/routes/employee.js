const express = require('express');
const router = express.Router();

const employeeService = require('../services/employeeService.js');
const ApiSecurity = require('../middleware/apiSecurity');

router.get('/search', ApiSecurity.requireLogin, employeeService.search);

router.get('/all', ApiSecurity.requireLogin, employeeService.getAll);
router.get('/:id', ApiSecurity.requireLogin, employeeService.getOne);
router.post('/add', ApiSecurity.requirePermits('manage_employee'), employeeService.add);
router.delete('/:id', ApiSecurity.requirePermits('manage_employee'), employeeService.delete);
router.put('/:id', ApiSecurity.requirePermits('manage_employee'), employeeService.update);

module.exports = router;