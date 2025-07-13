'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface VerticalReaderProps {
  workId: string;
  children: React.ReactNode;
}

export default function VerticalReader({ 
  workId, 
  children 
}: VerticalReaderProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Home':
          router.push(`/works/${workId}`);
          break;
        case 'Escape':
          router.push(`/works/${workId}`);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [workId, router]);

  return (
    <div className="h-full relative">
      {children}
    </div>
  );
}