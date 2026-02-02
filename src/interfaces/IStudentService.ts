import { IStudent } from '../models/Student';

export interface IStudentService {
    getAllStudents(): Promise<IStudent[]>;
    getStudentById(id: string): Promise<IStudent | null>;
    createStudent(studentData: IStudent): Promise<IStudent>;
    updateStudent(id: string, studentData: Partial<IStudent>): Promise<IStudent | null>;
    deleteStudent(id: string): Promise<IStudent | null>;
    searchStudents(query: string): Promise<IStudent[]>;
    filterByAge(minAge: number, maxAge: number): Promise<IStudent[]>;
}
