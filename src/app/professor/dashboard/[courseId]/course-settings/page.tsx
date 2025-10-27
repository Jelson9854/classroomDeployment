'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { CourseFormData } from '@/components/types';

export default function CourseSettings() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  // TODO: Fetch course data from backend
  const [courseData, setCourseData] = useState<CourseFormData>({
    courseCode: 'CS-101',
    courseName: 'Introduction to Computer Science',
    description: 'An introductory course covering fundamental concepts of computer science.',
    semester: 'Fall',
    year: '2025',
  });

  const [enrollmentCode, setEnrollmentCode] = useState('CS101-FALL25');
  const [assignmentDefaults, setAssignmentDefaults] = useState({
    allowLateSubmissions: true,
    latePenalty: 10,
    enableAI: true,
    defaultDuration: 7, // days
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const handleCourseDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveCourseInfo = async () => {
    setIsSaving(true);
    // TODO: API call to save course info
    console.log('Saving course info:', courseData);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      alert('Course information updated successfully!');
    }, 500);
  };

  const handleGenerateEnrollmentCode = () => {
    const randomCode = `${courseData.courseCode.replace('-', '')}-${courseData.semester.toUpperCase()}${courseData.year.slice(-2)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setEnrollmentCode(randomCode);
  };

  const handleCopyEnrollmentCode = () => {
    navigator.clipboard.writeText(enrollmentCode);
    alert('Enrollment code copied to clipboard!');
  };

  const handleArchiveCourse = () => {
    // TODO: API call to archive course
    console.log('Archiving course:', courseId);
    setShowArchiveModal(false);
    alert('Course archived successfully!');
    router.push('/professor/courses');
  };

  const handleDeleteCourse = () => {
    // TODO: API call to delete course
    console.log('Deleting course:', courseId);
    setShowDeleteModal(false);
    alert('Course deleted successfully!');
    router.push('/professor/courses');
  };

  const handleDefaultsChange = (field: string, value: boolean | number) => {
    setAssignmentDefaults(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveDefaults = async () => {
    setIsSaving(true);
    // TODO: API call to save defaults
    console.log('Saving assignment defaults:', assignmentDefaults);
    setTimeout(() => {
      setIsSaving(false);
      alert('Assignment defaults updated successfully!');
    }, 500);
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
              {courseData.courseCode}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Course Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* 1. Basic Course Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Course Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCourseInfo}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-lg transition-all"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  value={courseData.courseCode}
                  onChange={handleCourseDataChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleCourseDataChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleCourseDataChange}
                disabled={!isEditing}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500 resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select
                  name="semester"
                  value={courseData.semester}
                  onChange={handleCourseDataChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  name="year"
                  value={courseData.year}
                  onChange={handleCourseDataChange}
                  disabled={!isEditing}
                  min="2020"
                  max="2030"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Enrollment Code */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Student Enrollment</h2>
          <p className="text-sm text-gray-600 mb-4">
            Share this code with students so they can enroll in your course.
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-300 font-mono text-lg font-bold text-gray-900">
              {enrollmentCode}
            </div>
            <button
              onClick={handleCopyEnrollmentCode}
              className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>

          <button
            onClick={handleGenerateEnrollmentCode}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-all"
          >
            Generate New Code
          </button>
        </div>

        {/* 3. Assignment Defaults */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Assignment Defaults</h2>
              <p className="text-sm text-gray-600 mt-1">These settings will be used as defaults when creating new assignments</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Late Submissions */}
            <div className="flex items-start">
              <input
                id="allowLateSubmissions"
                type="checkbox"
                checked={assignmentDefaults.allowLateSubmissions}
                onChange={(e) => handleDefaultsChange('allowLateSubmissions', e.target.checked)}
                className="w-5 h-5 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <div className="ml-3 flex-1">
                <label htmlFor="allowLateSubmissions" className="text-sm font-medium text-gray-700">
                  Allow Late Submissions by Default
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Students can submit after the due date with a penalty
                </p>
              </div>
            </div>

            {assignmentDefaults.allowLateSubmissions && (
              <div className="ml-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Late Penalty (% per day)
                </label>
                <input
                  type="number"
                  value={assignmentDefaults.latePenalty}
                  onChange={(e) => handleDefaultsChange('latePenalty', parseInt(e.target.value))}
                  min="0"
                  max="100"
                  className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900"
                />
              </div>
            )}

            {/* AI Assistance */}
            <div className="flex items-start">
              <input
                id="enableAI"
                type="checkbox"
                checked={assignmentDefaults.enableAI}
                onChange={(e) => handleDefaultsChange('enableAI', e.target.checked)}
                className="w-5 h-5 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <div className="ml-3 flex-1">
                <label htmlFor="enableAI" className="text-sm font-medium text-gray-700">
                  Enable AI Assistance by Default
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Allow students to use ChatGPT while working on assignments
                </p>
              </div>
            </div>

            {/* Default Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Assignment Duration (days)
              </label>
              <input
                type="number"
                value={assignmentDefaults.defaultDuration}
                onChange={(e) => handleDefaultsChange('defaultDuration', parseInt(e.target.value))}
                min="1"
                max="90"
                className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                When creating an assignment, the due date will be set to this many days from today
              </p>
            </div>

            <button
              onClick={handleSaveDefaults}
              disabled={isSaving}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-all"
            >
              {isSaving ? 'Saving...' : 'Save Defaults'}
            </button>
          </div>
        </div>

        {/* 4. Archive/Delete Course */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Archive or Delete</h2>

          <div className="space-y-4">
            {/* Archive */}
            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Archive Course</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Course will be hidden from active courses but data will be preserved
                </p>
              </div>
              <button
                onClick={() => setShowArchiveModal(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all"
              >
                Archive
              </button>
            </div>

            {/* Delete */}
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Delete Course</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Permanently delete this course and all associated data. This action cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Archive Confirmation Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Archive Course?</h3>
            <p className="text-gray-600 mb-6">
              This course will be hidden from your active courses list but all data will be preserved. You can restore it later.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowArchiveModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleArchiveCourse}
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all"
              >
                Archive Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-4">Delete Course?</h3>
            <p className="text-gray-600 mb-6">
              This will permanently delete the course and all associated data including assignments, submissions, and grades. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCourse}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
