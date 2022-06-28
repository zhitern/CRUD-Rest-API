import {Router} from 'express';
import {getEmployees,getEmployee,createEmployee,deleteEmployee,updateEmployee} from './employeeController.js';

const router = Router();

router.get('/', getEmployees);

router.get('/:id', getEmployee);

router.post('/', createEmployee);

router.delete('/:id', deleteEmployee);

router.patch('/:id', updateEmployee);

export default router;