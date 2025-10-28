'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Course } from '@/components/types';

// TODO: This will be replaced with actual data from the backend
const mockCourses: Course[] = [
  {
    id: 1,
    code: 'CS-101',
    name: 'Introduction to Computer Science',
    students: 32,
    assignments: 5
  },
];

export default function CoursesSelection() {
  const router = useRouter();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [enrollmentCode, setEnrollmentCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    // TODO: Add actual logout logic (clear session, tokens, etc.)
    router.push('/');
  };

  const handleCourseClick = (courseId: number) => {
    // Navigate to course-specific dashboard
    router.push(`/student/dashboard/${courseId}`);
  };

  const handleJoinCourse = async () => {
    setError('');

    if (!enrollmentCode.trim()) {
      setError('Please enter a course enrollment code');
      return;
    }

    setIsJoining(true);

    // TODO: Replace with actual API call to validate and join course
    console.log('Joining course with code:', enrollmentCode);

    // Simulate API call
    setTimeout(() => {
      // For now, always succeed
      alert(`Successfully joined course with code: ${enrollmentCode}`);
      setShowJoinModal(false);
      setEnrollmentCode('');
      setIsJoining(false);
      // In real implementation, refresh courses list here
    }, 500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <p className="text-sm text-gray-600">Select a course to manage</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Join Course Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Join a Course
          </button>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Courses</h2>

          {mockCourses.length > 0 ? (
            <div className="space-y-4">
              {mockCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="w-full p-6 bg-gray-50 hover:bg-indigo-50 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg">
                          {course.code}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {course.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span>{course.students} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{course.assignments} Assignments</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-lg font-medium">No courses yet</p>
              <p className="text-sm mt-1">Click &quot;Join a Course&quot; to get started</p>
            </div>
          )}
        </div>
      </main>

      {/* Join Course Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Join a Course</h3>
            <p className="text-gray-600 mb-6">
              Enter the enrollment code provided by your professor to join a course.
            </p>

            <div className="mb-4">
              <label htmlFor="enrollmentCode" className="block text-sm font-medium text-gray-700 mb-2">
                Enrollment Code
              </label>
              <input
                id="enrollmentCode"
                type="text"
                value={enrollmentCode}
                onChange={(e) => setEnrollmentCode(e.target.value.toUpperCase())}
                placeholder="e.g., CS101-FALL25-ABC123"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 font-mono"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleJoinCourse();
                  }
                }}
              />
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setEnrollmentCode('');
                  setError('');
                }}
                disabled={isJoining}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-900 font-medium rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinCourse}
                disabled={isJoining}
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-all"
              >
                {isJoining ? 'Joining...' : 'Join Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
