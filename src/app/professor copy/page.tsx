'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfessorDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to courses selection page
    router.push('/professor/courses');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Redirecting to courses...</p>
      </div>
    </div>
  );
}
