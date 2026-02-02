import { IStudent } from '../models/Student';
import { IStudentService } from '../interfaces/IStudentService';
import { IStudentRepository } from '../interfaces/IStudentRepository';
import { ErrorMessage } from '../utils/enums';

class StudentService implements IStudentService {
  private studentRepository: IStudentRepository;

  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  async getAllStudents(): Promise<IStudent[]> {
    return await this.studentRepository.findAll();
  }

  async createStudent(studentData: IStudent): Promise<IStudent> {
    const existingStudent = await this.studentRepository.findByEmail(studentData.email);
    if (existingStudent) {
      throw new Error(ErrorMessage.STUDENT_EXISTS);
    }
    return await this.studentRepository.create(studentData);
  }

  async getStudentById(id: string): Promise<IStudent | null> {
    return await this.studentRepository.findById(id);
  }

  async updateStudent(id: string, studentData: Partial<IStudent>): Promise<IStudent | null> {
    return await this.studentRepository.update(id, studentData);
  }

  async deleteStudent(id: string): Promise<IStudent | null> {
    return await this.studentRepository.delete(id);
  }

  async searchStudents(query: string): Promise<IStudent[]> {
    return await this.studentRepository.search(query);
  }

  async filterByAge(minAge: number, maxAge: number): Promise<IStudent[]> {
    return await this.studentRepository.filterByAge(minAge, maxAge);
  }
}

export default StudentService;

