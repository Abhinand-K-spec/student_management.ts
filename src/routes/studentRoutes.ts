import express from 'express';
import StudentController from '../controllers/studentController';
import StudentService from '../services/studentService';
import { StudentRepository } from '../repositories/studentRepository';

const router = express.Router();

// Manual Dependency Injection
const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

router.get('/', studentController.getAllStudents);
router.post('/students', studentController.createStudent);
router.get('/students/:id', studentController.getStudentById);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);
router.get('/search', studentController.searchStudents);

export default router;

