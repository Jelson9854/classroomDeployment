'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Student, StudentRole } from '@/components/types';

// TODO: This will be replaced with actual data from the backend
const mockStudents: Student[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@university.edu', role: 'student', submissions: 3 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@university.edu', role: 'student', submissions: 5 },
  { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@university.edu', role: 'teaching_assistant', submissions: 4 },
  { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@university.edu', role: 'student', submissions: 2 },
  { id: 5, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@university.edu', role: 'student', submissions: 5 },
];

export default function ViewStudents() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  // TODO: Fetch course data from backend
  const courseData = {
    code: 'CS-101',
    name: 'Introduction to Computer Science',
  };

  const [students, setStudents] = useState<Student[]>(mockStudents);

  const handleRoleChange = (studentId: number, newRole: StudentRole) => {
    // TODO: Replace with actual API call to update student role
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, role: newRole } : student
      )
    );
    console.log(`Updated student ${studentId} role to ${newRole}`);
  };

  const handleStudentClick = (studentId: number) => {
    router.push(`/professor/dashboard/${courseId}/students/${studentId}`);
  };

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
              {courseData.code}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">{courseData.name}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {students.filter(s => s.role === 'student').length}
                </p>
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
                <p className="text-sm font-medium text-gray-600">Teaching Assistants</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {students.filter(s => s.role === 'teaching_assistant').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Students</h2>
            <p className="text-sm text-gray-600 mt-1">Click on a student to view their details</p>
          </div>

          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleStudentClick(student.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-700 font-semibold text-sm">
                              {student.firstName[0]}{student.lastName[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.submissions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={student.role}
                          onChange={(e) => handleRoleChange(student.id, e.target.value as StudentRole)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border-2 transition-all outline-none cursor-pointer ${
                            student.role === 'teaching_assistant'
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <option value="student">Student</option>
                          <option value="teaching_assistant">Teaching Assistant</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-lg font-medium">No students enrolled</p>
              <p className="text-sm mt-1">Students who register for this course will appear here</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
