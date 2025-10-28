'use client';

import { useRouter, useParams } from 'next/navigation';
import type { Assignment } from '@/components/types';

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
  {
    id: 4,
    courseId: 1,
    title: 'Comparative Analysis Essay',
    prompt: 'Compare and analyze...',
    dueDate: '2025-04-15',
    dueTime: '23:59',
    allowLateSubmissions: false,
    enableAI: true,
    publishImmediately: false,
  },
];

export default function CourseDashboard() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;

  // TODO: Fetch course data from backend using courseId
  const courseData = {
    id: courseId,
    code: 'CS-101',
    name: 'Introduction to Computer Science',
    students: 32,
    assignments: mockAssignments.length
  };

  const handleLogout = () => {
    // TODO: Add actual logout logic (clear session, tokens, etc.)
    router.push('/');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push('/professor/courses')}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg">
              {courseData.code}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">{courseData.name}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{courseData.students}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assignments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{courseData.assignments}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}/add-assignment`)}
              className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-all text-left"
            >
              <div className="font-semibold text-indigo-900">Create Assignment</div>
              <div className="text-sm text-indigo-700 mt-1">Add new assignment</div>
            </button>
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}/students`)}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-all text-left"
            >
              <div className="font-semibold text-green-900">View Students</div>
              <div className="text-sm text-green-700 mt-1">Manage enrolled students</div>
            </button>
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}/grade-submissions`)}
              className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-all text-left"
            >
              <div className="font-semibold text-amber-900">Grade Submissions</div>
              <div className="text-sm text-amber-700 mt-1">Review student work</div>
            </button>
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}/course-settings`)}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-all text-left"
            >
              <div className="font-semibold text-purple-900">Course Settings</div>
              <div className="text-sm text-purple-700 mt-1">Edit course details</div>
            </button>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Assignments</h2>
            <button
              onClick={() => router.push(`/professor/dashboard/${courseId}/add-assignment`)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              + Add Assignment
            </button>
          </div>

          {mockAssignments.length > 0 ? (
            <div className="space-y-3">
              {mockAssignments.map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => router.push(`/professor/dashboard/${courseId}/grade-submissions`)}
                  className="w-full p-4 bg-gray-50 hover:bg-indigo-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        {assignment.publishImmediately ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded">
                            Draft
                          </span>
                        )}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium">No assignments yet</p>
              <p className="text-sm mt-1">Create your first assignment to get started</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-lg font-medium">No recent activity</p>
            <p className="text-sm mt-1">Activity from your students will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
}
