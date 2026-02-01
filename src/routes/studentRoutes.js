"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../controllers/studentController"));
const router = express_1.default.Router();
const studentController = new studentController_1.default();
// Get all students (main page)
router.get('/', studentController.getAllStudents);
// Create a new student
router.post('/students', studentController.createStudent);
// Get a student by ID
router.get('/students/:id', studentController.getStudentById);
// Update a student
router.put('/students/:id', studentController.updateStudent);
// Delete a student
router.delete('/students/:id', studentController.deleteStudent);
// Search students
router.get('/search', studentController.searchStudents);
exports.default = router;
