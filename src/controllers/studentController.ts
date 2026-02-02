import { Request, Response, NextFunction } from 'express';
import { IStudentService } from '../interfaces/IStudentService';
import { IStudent } from '../models/Student';
import { SuccessMessage, ErrorMessage, HttpStatus } from '../utils/enums';

class StudentController {
  private studentService: IStudentService;

  constructor(studentService: IStudentService) {
    this.studentService = studentService;
  }

  getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const students = await this.studentService.getAllStudents();
      res.render('index', {
        title: 'Student Management System',
        students,
        message: req.query.message || ''
      });
    } catch (error) {
      next(error);
    }
  };

  createStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentData = req.body as IStudent;
      await this.studentService.createStudent(studentData);
      res.redirect(`/?message=${SuccessMessage.STUDENT_ADDED}`);
    } catch (error) {
      next(error);
    }
  };

  getStudentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const student = await this.studentService.getStudentById(id);

      if (!student) {
        res.status(HttpStatus.NOT_FOUND).send(ErrorMessage.STUDENT_NOT_FOUND);
        return;
      }

      res.json(student);
    } catch (error) {
      next(error);
    }
  };

  updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const studentData = req.body as Partial<IStudent>;
      await this.studentService.updateStudent(id, studentData);
      res.redirect(`/?message=${SuccessMessage.STUDENT_UPDATED}`);
    } catch (error) {
      next(error);
    }
  };

  deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      await this.studentService.deleteStudent(id);
      res.redirect(`/?message=${SuccessMessage.STUDENT_DELETED}`);
    } catch (error) {
      next(error);
    }
  };

  searchStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query.q as string;
      const filteredStudents = await this.studentService.searchStudents(query);
      res.json(filteredStudents);
    } catch (error) {
      next(error);
    }
  };

  filterByAge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const minAge = parseInt(req.query.min as string) || 0;
      const maxAge = parseInt(req.query.max as string) || 100;
      const filteredStudents = await this.studentService.filterByAge(minAge, maxAge);
      res.json(filteredStudents);
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
