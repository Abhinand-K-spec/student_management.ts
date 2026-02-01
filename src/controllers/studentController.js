"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentService_1 = __importDefault(require("../services/studentService"));
class StudentController {
    constructor() {
        // Get all students
        this.getAllStudents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.studentService.getAllStudents();
                res.render('index', {
                    title: 'Student Management System',
                    students,
                    message: req.query.message || ''
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Create a new student
        this.createStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const studentData = req.body;
                yield this.studentService.createStudent(studentData);
                res.redirect('/?message=Student added successfully');
            }
            catch (error) {
                next(error);
            }
        });
        // Get a student by ID
        this.getStudentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const student = yield this.studentService.getStudentById(id);
                if (!student) {
                    res.status(404).send('Student not found');
                    return;
                }
                res.json(student);
            }
            catch (error) {
                next(error);
            }
        });
        // Update a student
        this.updateStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const studentData = req.body;
                yield this.studentService.updateStudent(id, studentData);
                res.redirect('/?message=Student updated successfully');
            }
            catch (error) {
                next(error);
            }
        });
        // Delete a student
        this.deleteStudent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.studentService.deleteStudent(id);
                res.redirect('/?message=Student deleted successfully');
            }
            catch (error) {
                next(error);
            }
        });
        // Search students
        this.searchStudents = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.q;
                const filteredStudents = yield this.studentService.searchStudents(query);
                res.json(filteredStudents);
            }
            catch (error) {
                next(error);
            }
        });
        // Filter students by age
        this.filterByAge = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const minAge = parseInt(req.query.min) || 0;
                const maxAge = parseInt(req.query.max) || 100;
                const filteredStudents = yield this.studentService.filterByAge(minAge, maxAge);
                res.json(filteredStudents);
            }
            catch (error) {
                next(error);
            }
        });
        this.studentService = new studentService_1.default();
    }
}
exports.default = StudentController;
