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
const Student_1 = __importDefault(require("../models/Student"));
const mongoose_1 = __importDefault(require("mongoose"));
class StudentService {
    // Get all students
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Student_1.default.find().sort({ createdAt: -1 });
            }
            catch (error) {
                throw new Error(`Error getting students: ${error}`);
            }
        });
    }
    // Create a new student
    createStudent(studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = new Student_1.default(studentData);
                return yield student.save();
            }
            catch (error) {
                throw new Error(`Error creating student: ${error}`);
            }
        });
    }
    // Get a student by ID
    getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new Error('Invalid student ID');
                }
                return yield Student_1.default.findById(id);
            }
            catch (error) {
                throw new Error(`Error getting student: ${error}`);
            }
        });
    }
    // Update a student
    updateStudent(id, studentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new Error('Invalid student ID');
                }
                return yield Student_1.default.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
            }
            catch (error) {
                throw new Error(`Error updating student: ${error}`);
            }
        });
    }
    // Delete a student
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    throw new Error('Invalid student ID');
                }
                return yield Student_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                throw new Error(`Error deleting student: ${error}`);
            }
        });
    }
    // Search students by name or email
    searchStudents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!query) {
                    return yield this.getAllStudents();
                }
                return yield Student_1.default.find({
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { email: { $regex: query, $options: 'i' } },
                        { course: { $regex: query, $options: 'i' } },
                        { batch: { $regex: query, $options: 'i' } }
                    ]
                });
            }
            catch (error) {
                throw new Error(`Error searching students: ${error}`);
            }
        });
    }
    // Filter students by age range
    filterByAge(minAge, maxAge) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Student_1.default.find({
                    age: { $gte: minAge, $lte: maxAge }
                });
            }
            catch (error) {
                throw new Error(`Error filtering students by age: ${error}`);
            }
        });
    }
}
exports.default = StudentService;
