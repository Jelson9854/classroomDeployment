'use client';

import { useRouter, useParams } from 'next/navigation';
import type { Student, Submission, Course } from '@/components/types';

// TODO: Replace with actual data from backend
const mockStudentData: Student = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@university.edu',
  role: 'student',
  submissions: 3,
  enrolledDate: '2025-01-15',
};

const mockSubmissions: Submission[] = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 1,
    assignmentTitle: 'Persuasive Essay on Climate Change',
    dueDate: '2025-02-15',
    submittedDate: '2025-02-14',
    status: 'submitted',
    grade: 95,
    wordCount: 1250,
  },
  {
    id: 2,
    assignmentId: 2,
    studentId: 1,
    assignmentTitle: 'Argumentative Essay on Social Media',
    dueDate: '2025-03-01',
    submittedDate: '2025-02-28',
    status: 'submitted',
    grade: 88,
    wordCount: 1100,
  },
  {
    id: 3,
    assignmentId: 3,
    studentId: 1,
    assignmentTitle: 'Narrative Essay on Personal Experience',
    dueDate: '2025-03-15',
    submittedDate: null,
    status: 'pending',
    grade: null,
    wordCount: null,
  },
  {
    id: 4,
    assignmentId: 4,
    studentId: 1,
    assignmentTitle: 'Research Paper on AI Ethics',
    dueDate: '2025-04-01',
    submittedDate: '2025-04-01',
    status: 'late',
    grade: 82,
    wordCount: 2000,
  },
  {
    id: 5,
    assignmentId: 5,
    studentId: 1,
    assignmentTitle: 'Comparative Analysis Essay',
    dueDate: '2025-04-15',
    submittedDate: null,
    status: 'not_started',
    grade: null,
    wordCount: null,
  },
];

const mockCourseData: Partial<Course> = {
  code: 'CS-101',
  name: 'Introduction to Computer Science',
};

export default function StudentDetail() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const studentId = params.studentId as string;

  // TODO: Fetch student data and submissions from backend
  const student = mockStudentData;
  const submissions = mockSubmissions;
  const course = mockCourseData;

  const handleViewSubmission = (assignmentId: number) => {
    // TODO: Navigate to submission detail/grading page
    console.log(`View submission for assignment ${assignmentId} by student ${studentId}`);
    // router.push(`/professor/dashboard/${courseId}/assignments/${assignmentId}/submissions/${studentId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'late':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'not_started':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'late':
        return 'Late Submission';
      case 'pending':
        return 'Pending';
      case 'not_started':
        return 'Not Started';
      default:
        return status;
    }
  };

  const completedCount = submissions.filter(s => s.status === 'submitted' || s.status === 'late').length;
  const averageGrade = submissions
    .filter(s => s.grade !== null)
    .reduce((acc, s) => acc + (s.grade || 0), 0) / submissions.filter(s => s.grade !== null).length || 0;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}/students`)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Students
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg">
              {course.code}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">
              {student.firstName} {student.lastName}
            </h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">{student.email}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Student Info & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{submissions.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {averageGrade > 0 ? `${averageGrade.toFixed(1)}%` : 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {submissions.filter(s => s.status === 'pending' || s.status === 'not_started').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Assignment Submissions</h2>
            <p className="text-sm text-gray-600 mt-1">Click on a submission to view details and grade</p>
          </div>

          <div className="divide-y divide-gray-200">
            {submissions.map((submission) => (
              <button
                key={submission.assignmentId}
                onClick={() => handleViewSubmission(submission.assignmentId)}
                className="w-full p-6 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.assignmentTitle}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusBadge(submission.status)}`}>
                        {getStatusText(submission.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Due: {new Date(submission.dueDate).toLocaleDateString()}</span>
                      </div>
                      {submission.submittedDate && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {submission.wordCount && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{submission.wordCount} words</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {submission.grade !== null && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{submission.grade}%</div>
                        <div className="text-xs text-gray-500">Grade</div>
                      </div>
                    )}
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
