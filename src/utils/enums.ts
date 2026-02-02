export enum ErrorMessage {
    ERROR_GETTING_STUDENTS = 'Error getting students',
    ERROR_CREATING_STUDENT = 'Error creating student',
    ERROR_GETTING_STUDENT = 'Error getting student',
    ERROR_UPDATING_STUDENT = 'Error updating student',
    ERROR_DELETING_STUDENT = 'Error deleting student',
    ERROR_SEARCHING_STUDENTS = 'Error searching students',
    ERROR_FILTERING_STUDENTS = 'Error filtering students by age',
    INVALID_STUDENT_ID = 'Invalid student ID',
    STUDENT_NOT_FOUND = 'Student not found',
    STUDENT_EXISTS = 'Student with that email already exists',
    RECORD_ALREADY_EXISTS = 'A record with that data already exists',
    SOMETHING_WENT_WRONG = 'Something went wrong',
}

export enum SuccessMessage {
    STUDENT_ADDED = 'Student added successfully',
    STUDENT_UPDATED = 'Student updated successfully',
    STUDENT_DELETED = 'Student deleted successfully',
}

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
