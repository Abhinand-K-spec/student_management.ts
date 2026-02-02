import Student, { IStudent } from '../models/Student';
import { IStudentRepository } from '../interfaces/IStudentRepository';
import mongoose from 'mongoose';
import { ErrorMessage } from '../utils/enums';

export class StudentRepository implements IStudentRepository {
    async findAll(): Promise<IStudent[]> {
        try {
            return await Student.find().sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_GETTING_STUDENTS}: ${error}`);
        }
    }

    async findById(id: string): Promise<IStudent | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(ErrorMessage.INVALID_STUDENT_ID);
            }
            return await Student.findById(id);
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_GETTING_STUDENT}: ${error}`);
        }
    }

    async findByEmail(email: string): Promise<IStudent | null> {
        try {
            return await Student.findOne({ email });
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_GETTING_STUDENT}: ${error}`);
        }
    }

    async create(studentData: IStudent): Promise<IStudent> {
        try {
            const student = new Student(studentData);
            return await student.save();
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_CREATING_STUDENT}: ${error}`);
        }
    }

    async update(id: string, studentData: Partial<IStudent>): Promise<IStudent | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(ErrorMessage.INVALID_STUDENT_ID);
            }
            return await Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true });
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_UPDATING_STUDENT}: ${error}`);
        }
    }

    async delete(id: string): Promise<IStudent | null> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error(ErrorMessage.INVALID_STUDENT_ID);
            }
            return await Student.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_DELETING_STUDENT}: ${error}`);
        }
    }

    async search(query: string): Promise<IStudent[]> {
        try {
            if (!query) return await this.findAll();

            return await Student.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { course: { $regex: query, $options: 'i' } },
                    { batch: { $regex: query, $options: 'i' } }
                ]
            });
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_SEARCHING_STUDENTS}: ${error}`);
        }
    }

    async filterByAge(minAge: number, maxAge: number): Promise<IStudent[]> {
        try {
            return await Student.find({
                age: { $gte: minAge, $lte: maxAge }
            });
        } catch (error) {
            throw new Error(`${ErrorMessage.ERROR_FILTERING_STUDENTS}: ${error}`);
        }
    }
}
