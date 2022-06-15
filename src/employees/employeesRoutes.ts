import {Router} from 'express';
import {getEmployees,getEmployee,createEmployee,deleteEmployee,updateEmployee} from './employeesController.js';

const router = Router();

router.get('/', getEmployees);

router.get('/:id', getEmployee);

router.post('/', createEmployee);

router.delete('/:id', deleteEmployee)

router.patch('/:id', updateEmployee)

export default router;


// import express from 'express';
// import {getUser, getUsers, createUser, deleteUser, updateUser} from '../controllers/users.js';

// const router = express.Router();

// router.get('/', getUsers);

// router.post('/', createUser);

// router.get('/:id', getUser);

// router.delete('/:id', deleteUser)

// router.patch('/:id', updateUser)

// export default router;