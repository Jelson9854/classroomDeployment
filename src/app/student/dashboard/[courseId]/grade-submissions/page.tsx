'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Assignment, Submission } from '@/components/types';

// TODO: Replace with actual data from backend
const mockAssignments: Assignment[] = [
  {
    id: 1,
    courseId: 1,
    title: 'Persuasive Essay on Climate Change',
    prompt: 'Write a persuasive essay...',
    dueDate: '2025-02-15',
    dueTime: '23:59',
    allowLateSubmissions: true,
    latePenalty: 10,
    enableAI: true,
    publishImmediately: true,
  },
  {
    id: 2,
    courseId: 1,
    title: 'Argumentative Essay on Social Media',
    prompt: 'Write an argumentative essay...',
    dueDate: '2025-03-01',
    dueTime: '23:59',
    allowLateSubmissions: true,
    latePenalty: 10,
    enableAI: true,
    publishImmediately: true,
  },
  {
    id: 3,
    courseId: 1,
    title: 'Narrative Essay on Personal Experience',
    prompt: 'Write a narrative essay...',
    dueDate: '2025-03-15',
    dueTime: '23:59',
    allowLateSubmissions: false,
    enableAI: true,
    publishImmediately: true,
  },
];

// Mock submissions grouped by assignment
const mockSubmissionsByAssignment: Record<number, Submission[]> = {
  1: [
    {
      id: 1,
      assignmentId: 1,
      studentId: 1,
      assignmentTitle: "Persuasive Essay on Climate Change",
      dueDate: "2025-02-15",
      submittedDate: "2025-02-14",
      status: "submitted",
      grade: 95,
      wordCount: 1250,
    },
    {
      id: 2,
      assignmentId: 1,
      studentId: 2,
      assignmentTitle: "Persuasive Essay on Climate Change",
      dueDate: "2025-02-15",
      submittedDate: "2025-02-14",
      status: "submitted",
      grade: 88,
      wordCount: 1100,
    },
    {
      id: 3,
      assignmentId: 1,
      studentId: 3,
      assignmentTitle: "Persuasive Essay on Climate Change",
      dueDate: "2025-02-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
    {
      id: 4,
      assignmentId: 1,
      studentId: 4,
      assignmentTitle: "Persuasive Essay on Climate Change",
      dueDate: "2025-02-15",
      submittedDate: "2025-02-16",
      status: "late",
      grade: 82,
      wordCount: 1300,
    },
    {
      id: 5,
      assignmentId: 1,
      studentId: 5,
      assignmentTitle: "Persuasive Essay on Climate Change",
      dueDate: "2025-02-15",
      submittedDate: "2025-02-13",
      status: "submitted",
      grade: 92,
      wordCount: 1400,
    },
  ],
  2: [
    {
      id: 6,
      assignmentId: 2,
      studentId: 1,
      assignmentTitle: "Argumentative Essay on Social Media",
      dueDate: "2025-03-01",
      submittedDate: "2025-02-28",
      status: "submitted",
      grade: null,
      wordCount: 1200,
    },
    {
      id: 7,
      assignmentId: 2,
      studentId: 2,
      assignmentTitle: "Argumentative Essay on Social Media",
      dueDate: "2025-03-01",
      submittedDate: "2025-02-28",
      status: "submitted",
      grade: 90,
      wordCount: 1150,
    },
    {
      id: 8,
      assignmentId: 2,
      studentId: 3,
      assignmentTitle: "Argumentative Essay on Social Media",
      dueDate: "2025-03-01",
      submittedDate: null,
      status: "not_started",
      grade: null,
      wordCount: null,
    },
    {
      id: 9,
      assignmentId: 2,
      studentId: 4,
      assignmentTitle: "Argumentative Essay on Social Media",
      dueDate: "2025-03-01",
      submittedDate: "2025-03-01",
      status: "submitted",
      grade: 85,
      wordCount: 1000,
    },
    {
      id: 10,
      assignmentId: 1,
      studentId: 5,
      assignmentTitle: "Persuasive Essay on Climate Change",
      dueDate: "2025-02-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
  ],
  3: [
    {
      id: 11,
      assignmentId: 3,
      studentId: 1,
      assignmentTitle: "Narrative Essay on Personal Experience",
      dueDate: "2025-03-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
    {
      id: 12,
      assignmentId: 3,
      studentId: 2,
      assignmentTitle: "Narrative Essay on Personal Experience",
      dueDate: "2025-03-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
    {
      id: 13,
      assignmentId: 3,
      studentId: 3,
      assignmentTitle: "Narrative Essay on Personal Experience",
      dueDate: "2025-03-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
    {
      id: 14,
      assignmentId: 3,
      studentId: 4,
      assignmentTitle: "Narrative Essay on Personal Experience",
      dueDate: "2025-03-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
    {
      id: 15,
      assignmentId: 3,
      studentId: 5,
      assignmentTitle: "Narrative Essay on Personal Experience",
      dueDate: "2025-03-15",
      submittedDate: null,
      status: "pending",
      grade: null,
      wordCount: null,
    },
  ],
};

const mockStudentNames: Record<number, string> = {
  1: 'John Doe',
  2: 'Jane Smith',
  3: 'Michael Johnson',
  4: 'Emily Brown',
  5: 'David Wilson',
};

const mockCourseData = {
  code: 'CS-101',
  name: 'Introduction to Computer Science',
};

export default function GradeSubmissions() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  // TODO: Fetch assignments and submissions from backend
  const assignments = mockAssignments;
  const submissionsByAssignment = mockSubmissionsByAssignment;
  const course = mockCourseData;

  // State to track which assignments are expanded
  const [expandedAssignments, setExpandedAssignments] = useState<Set<number>>(new Set());

  const toggleAssignment = (assignmentId: number) => {
    setExpandedAssignments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assignmentId)) {
        newSet.delete(assignmentId);
      } else {
        newSet.add(assignmentId);
      }
      return newSet;
    });
  };

  const handleSubmissionClick = (assignmentId: number, studentId: number) => {
    // TODO: Navigate to grading page for specific submission
    console.log(`Grade assignment ${assignmentId} for student ${studentId}`);
    router.push(`/professor/dashboard/${courseId}/assignments/${assignmentId}/grade/${studentId}`);
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
        return 'Late';
      case 'pending':
        return 'Pending';
      case 'not_started':
        return 'Not Started';
      default:
        return status;
    }
  };

  const totalSubmissions = Object.values(submissionsByAssignment).flat().length;
  const gradedSubmissions = Object.values(submissionsByAssignment)
    .flat()
    .filter(s => s.grade !== null).length;
  const pendingGrading = Object.values(submissionsByAssignment)
    .flat()
    .filter(s => s.status === 'submitted' && s.grade === null).length;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}`)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Course Dashboard
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg">
              {course.code}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Grade Submissions</h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">{course.name}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalSubmissions}</p>
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
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{gradedSubmissions}</p>
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
                <p className="text-sm font-medium text-gray-600">Pending Grading</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingGrading}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Assignments with Submissions */}
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const submissions = submissionsByAssignment[assignment.id] || [];
            const submittedCount = submissions.filter(s => s.status === 'submitted' || s.status === 'late').length;
            const isExpanded = expandedAssignments.has(assignment.id);

            return (
              <div key={assignment.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleAssignment(assignment.id)}
                  className="w-full p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <svg
                          className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 ml-8">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()} at {assignment.dueTime}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-gray-900">{submittedCount}/{submissions.length}</div>
                      <div className="text-xs text-gray-500">Submitted</div>
                    </div>
                  </div>
                </button>

                {isExpanded && submissions.length > 0 && (
                  <div className="divide-y divide-gray-200 border-t border-gray-200">
                    {submissions.map((submission) => (
                      <button
                        key={submission.id}
                        onClick={() => handleSubmissionClick(assignment.id, submission.studentId)}
                        className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-700 font-semibold text-sm">
                              {mockStudentNames[submission.studentId]?.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {mockStudentNames[submission.studentId]}
                            </div>
                            {submission.submittedDate && (
                              <div className="text-sm text-gray-600 mt-1">
                                Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-lg border ${getStatusBadge(submission.status)}`}>
                            {getStatusText(submission.status)}
                          </span>
                          {submission.grade !== null ? (
                            <div className="text-center min-w-[60px]">
                              <div className="text-xl font-bold text-gray-900">{submission.grade}%</div>
                            </div>
                          ) : submission.status === 'submitted' || submission.status === 'late' ? (
                            <div className="text-center min-w-[60px]">
                              <div className="text-sm font-medium text-amber-600">Needs Grading</div>
                            </div>
                          ) : (
                            <div className="text-center min-w-[60px]">
                              <div className="text-sm text-gray-400">—</div>
                            </div>
                          )}
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {isExpanded && submissions.length === 0 && (
                  <div className="text-center py-8 text-gray-500 border-t border-gray-200">
                    <p className="text-sm">No submissions yet</p>
                  </div>
                )}
              </div>
            );
          })}

          {assignments.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium text-gray-900">No assignments yet</p>
              <p className="text-sm text-gray-500 mt-1">Create an assignment to start receiving submissions</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
