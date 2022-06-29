import {Router} from 'express';
import {getEmployees,getEmployee,createEmployee,deleteEmployee,updateEmployee} from './employeeController';
import { authenticate } from '../user/userController.js';

const router = Router();

router.get('/', getEmployees);

router.get('/:id', getEmployee);

router.post('/', createEmployee);

router.delete('/:id', deleteEmployee);

router.patch('/:id', updateEmployee);

export default router;