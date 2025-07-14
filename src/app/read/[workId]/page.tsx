import { notFound } from 'next/navigation';
import { getWork, getAuthor } from '@/utils/content';
import ReaderPageClient from './ReaderPageClient';

export function generateStaticParams() {
  // 作品IDのみを返す
  return [
    { workId: 'musoko-no-ana' }
  ];
}

interface ReaderPageProps {
  params: Promise<{ workId: string }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { workId } = await params;
  const work = getWork(workId);
  const author = work ? getAuthor(work.authorId) : null;

  if (!work || !author) {
    notFound();
  }

  // 全章のコンテンツを結合
  const fullContent = work.chapters
    .sort((a, b) => a.chapterNumber - b.chapterNumber)
    .map(chapter => chapter.content)
    .join('\n\n');

  return (
    <ReaderPageClient 
      work={work}
      author={author}
      fullContent={fullContent}
      workId={workId}
    />
  );
}