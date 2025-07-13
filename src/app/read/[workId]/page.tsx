import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWork, getAuthor } from '@/utils/content';
import VerticalReader from '@/components/reader/VerticalReader';
import EasoshiReader from '@/components/reader/EasoshiReader';

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
    <div className="h-screen flex flex-col bg-black">
      
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/works/${workId}`}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                ← 作品に戻る
              </Link>
              <div className="text-gray-400 text-sm">
                {work.title}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <VerticalReader workId={workId}>
          {/* ダークモード背景 */}
          <div className="absolute inset-0 bg-black" />
        
        <article className="relative h-full overflow-hidden">
          {/* Easoshi風リーダー */}
          <EasoshiReader content={fullContent} />
        </article>
        </VerticalReader>
      </main>

    </div>
  );
}