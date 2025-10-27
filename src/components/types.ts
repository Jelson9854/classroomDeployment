// User and Role Types
export type UserRole = 'student' | 'professor';
export type StudentRole = 'student' | 'teaching_assistant';

// User Interface
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Student Interface
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: StudentRole;
  submissions: number;
  enrolledDate?: string;
}

// Course Interface
export interface Course {
  id: number;
  code: string;
  name: string;
  description?: string;
  semester?: string;
  year?: string;
  students?: number;
  assignments?: number;
}

// Assignment Interface
export interface Assignment {
  id: number;
  courseId: number;
  title: string;
  prompt: string;
  instructions?: string;
  dueDate: string;
  dueTime: string;
  allowLateSubmissions: boolean;
  latePenalty?: number;
  enableAI: boolean;
  aiPrePrompt?: string;
  publishImmediately: boolean;
  createdAt?: string;
}

// Submission Status Type
export type SubmissionStatus = 'submitted' | 'late' | 'pending' | 'not_started';

// Submission Interface
export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  assignmentTitle: string;
  dueDate: string;
  submittedDate: string | null;
  status: SubmissionStatus;
  grade: number | null;
  wordCount: number | null;
  content?: string;
  feedback?: string;
}

// Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  courseCode: string;
  role: UserRole;
}

export interface CourseFormData {
  courseCode: string;
  courseName: string;
  description: string;
  semester: string;
  year: string;
}

export interface AssignmentFormData {
  title: string;
  prompt: string;
  dueDate: string;
  dueTime: string;
  instructions: string;
  allowLateSubmissions: boolean;
  latePenalty: string;
  enableAI: boolean;
  aiPrePrompt: string;
  publishImmediately: boolean;
}
