'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AddAssignment() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    dueDate: '',
    dueTime: '',
    instructions: '',
    allowLateSubmissions: false,
    latePenalty: '',
    enableAI: true,
    aiPrePrompt: '',
    publishImmediately: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.title || !formData.prompt || !formData.dueDate || !formData.dueTime) {
      setError('Please fill out all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.allowLateSubmissions && !formData.latePenalty) {
      setError('Please specify late penalty percentage');
      setIsLoading(false);
      return;
    }


    // TODO: Replace with actual API call to save assignment
    console.log('Assignment data:', { ...formData, courseId });

    // Simulate API call
    setTimeout(() => {
      alert(`Assignment "${formData.title}" ${formData.publishImmediately ? 'published' : 'saved as draft'} successfully!`);
      router.push(`/professor/dashboard/${courseId}`);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Assignment</h1>
            <p className="text-sm text-gray-600">Set up a writing assignment for your students</p>
          </div>
          <button
            onClick={() => router.push(`/professor/dashboard/${courseId}`)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
          >
            Back to Course
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Assignment Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Assignment Details</h2>

            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Persuasive Essay on Climate Change"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Writing Prompt */}
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Writing Prompt <span className="text-red-500">*</span>
              </label>
              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                placeholder="Enter the writing prompt or question that students need to address..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 resize-y"
                required
              />
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Provide any additional guidelines, rubric details, formatting requirements, etc."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400 resize-y"
              />
            </div>

            {/* Due Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Time <span className="text-red-500">*</span>
                </label>
                <input
                  id="dueTime"
                  type="time"
                  name="dueTime"
                  value={formData.dueTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submission Settings Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Submission Settings</h2>

            {/* Allow Late Submissions */}
            <div className="mb-6 flex items-start">
              <input
                id="allowLateSubmissions"
                type="checkbox"
                name="allowLateSubmissions"
                checked={formData.allowLateSubmissions}
                onChange={handleChange}
                className="w-5 h-5 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <div className="ml-3">
                <label htmlFor="allowLateSubmissions" className="text-sm font-medium text-gray-700">
                  Allow Late Submissions
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Students can submit after the due date with a penalty
                </p>
              </div>
            </div>

            {/* Late Penalty */}
            {formData.allowLateSubmissions && (
              <div className="mb-6 ml-8">
                <label htmlFor="latePenalty" className="block text-sm font-medium text-gray-700 mb-2">
                  Late Penalty (% per day) <span className="text-red-500">*</span>
                </label>
                <input
                  id="latePenalty"
                  type="number"
                  name="latePenalty"
                  value={formData.latePenalty}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter percentage to deduct per day late (0-100)
                </p>
              </div>
            )}
          </div>

          {/* AI Configuration Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">AI Assistant Configuration</h2>
                <p className="text-sm text-gray-600 mt-1">Configure ChatGPT assistance for students</p>
              </div>
              {/* Toggle Switch */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Enable AI</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.enableAI}
                  onClick={() => setFormData(prev => ({ ...prev, enableAI: !prev.enableAI }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    formData.enableAI ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.enableAI ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* AI Pre-Prompt */}
            <div>
              <label htmlFor="aiPrePrompt" className="block text-sm font-medium text-gray-700 mb-2">
                AI System Pre-Prompt
              </label>
              <textarea
                id="aiPrePrompt"
                name="aiPrePrompt"
                value={formData.aiPrePrompt}
                onChange={handleChange}
                disabled={!formData.enableAI}
                placeholder="Enter instructions for the AI assistant. This will be used to configure how the AI responds to student queries.

Example:
You are a helpful writing tutor. Help students brainstorm ideas and improve their writing, but do not write the essay for them. Encourage critical thinking and guide them with questions rather than giving direct answers."
                rows={8}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 resize-y font-mono text-sm ${
                  formData.enableAI ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.enableAI
                  ? 'This pre-prompt will guide the AI\'s behavior and responses. Be specific about what kind of help students should receive.'
                  : 'Enable AI assistant to configure the pre-prompt settings.'}
              </p>
            </div>
          </div>

          {/* Visibility Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Visibility</h2>

            {/* Publish Immediately Checkbox */}
            <div className="flex items-start">
              <input
                id="publishImmediately"
                type="checkbox"
                name="publishImmediately"
                checked={formData.publishImmediately}
                onChange={handleChange}
                className="w-5 h-5 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <div className="ml-3">
                <label htmlFor="publishImmediately" className="text-sm font-medium text-gray-700">
                  Publish Immediately
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.publishImmediately
                    ? 'This assignment will be immediately visible to students'
                    : 'This assignment will be saved as a draft and not visible to students'}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push(`/professor/dashboard/${courseId}`)}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading
                ? (formData.publishImmediately ? 'Publishing...' : 'Saving...')
                : (formData.publishImmediately ? 'Publish Assignment' : 'Save as Draft')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
