"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeesController_js_1 = require("./employeesController.js");
const router = (0, express_1.Router)();
router.get('/', employeesController_js_1.getEmployees);
router.get('/:id', employeesController_js_1.getEmployee);
router.post('/', employeesController_js_1.createEmployee);
router.delete('/:id', employeesController_js_1.deleteEmployee);
router.patch('/:id', employeesController_js_1.updateEmployee);
exports.default = router;
// import express from 'express';
// import {getUser, getUsers, createUser, deleteUser, updateUser} from '../controllers/users.js';
// const router = express.Router();
// router.get('/', getUsers);
// router.post('/', createUser);
// router.get('/:id', getUser);
// router.delete('/:id', deleteUser)
// router.patch('/:id', updateUser)
// export default router;
