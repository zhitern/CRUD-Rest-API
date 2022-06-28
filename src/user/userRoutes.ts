import {Router} from 'express';
import { Register, LogIn } from './userController';
//import {getEmployees,getEmployee,createEmployee,deleteEmployee,updateEmployee} from './employeeController.js';

const router = Router();

// router.get('/', ()=>{});

// router.get('/:id', ()=>{});

router.post('/Register', Register);
router.post('/Login', LogIn);

// router.delete('/:id', ()=>{});

// router.patch('/:id', ()=>{});

export default router;