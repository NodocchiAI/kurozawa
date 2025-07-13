'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface VerticalReaderProps {
  workId: string;
  chapterId: string;
  prevChapter?: { id: string } | null;
  nextChapter?: { id: string } | null;
  children: React.ReactNode;
}

export default function VerticalReader({ 
  workId, 
  chapterId, 
  prevChapter, 
  nextChapter, 
  children 
}: VerticalReaderProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (nextChapter) {
            router.push(`/read/${workId}/${nextChapter.id}`);
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (prevChapter) {
            router.push(`/read/${workId}/${prevChapter.id}`);
          }
          break;
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
  }, [workId, chapterId, prevChapter, nextChapter, router]);

  return (
    <div className="h-full relative">
      {children}
    </div>
  );
}