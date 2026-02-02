import { IStudent } from '../models/Student';

export interface IStudentRepository {
    findAll(): Promise<IStudent[]>;
    findById(id: string): Promise<IStudent | null>;
    findByEmail(email: string): Promise<IStudent | null>;
    create(studentData: IStudent): Promise<IStudent>;
    update(id: string, studentData: Partial<IStudent>): Promise<IStudent | null>;
    delete(id: string): Promise<IStudent | null>;
    search(query: string): Promise<IStudent[]>;
    filterByAge(minAge: number, maxAge: number): Promise<IStudent[]>;
}
