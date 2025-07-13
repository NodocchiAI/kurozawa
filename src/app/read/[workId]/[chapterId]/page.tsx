import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWork, getAuthor, getChapter, getChapters } from '@/utils/content';
import VerticalReader from '@/components/reader/VerticalReader';
import { parseTextWithRuby } from '@/utils/rubyParser';

export function generateStaticParams() {
  const chapters = getChapters();
  return chapters.map((chapter) => ({
    workId: chapter.workId,
    chapterId: chapter.id,
  }));
}

interface ReaderPageProps {
  params: Promise<{ workId: string; chapterId: string }>;
}

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { workId, chapterId } = await params;
  const work = getWork(workId);
  const chapter = getChapter(chapterId);
  const author = work ? getAuthor(work.authorId) : null;

  if (!work || !chapter || !author) {
    notFound();
  }

  const currentIndex = work.chapters.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? work.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < work.chapters.length - 1 ? work.chapters[currentIndex + 1] : null;

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
                {work.title} / {chapter.title}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{currentIndex + 1} / {work.chapters.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <VerticalReader 
          workId={workId} 
          chapterId={chapterId} 
          prevChapter={prevChapter} 
          nextChapter={nextChapter}
        >
          {/* ダークモード背景 */}
          <div className="absolute inset-0 bg-black" />
        
        <article className="relative h-full overflow-hidden">
          {/* 章タイトルエリア（右上） */}
          <div className="absolute top-4 right-6 text-right z-10">
            <h1 className="text-lg font-serif text-gray-300 mb-1 vertical-text opacity-70">
              {chapter.title}
            </h1>
            <div className="text-gray-500 text-xs vertical-text">
              <div>{author.name}</div>
              {author.pseudonym && <div className="mt-1">（{author.pseudonym}）</div>}
            </div>
          </div>

          {/* 縦書きコンテンツエリア */}
          <div className="reader-main">
            <div className="reader-content-wrapper">
              {(() => {
                const paragraphs = chapter.content.split('\n\n');
                const midPoint = Math.ceil(paragraphs.length / 2);
                const firstHalf = paragraphs.slice(0, midPoint).join('\n\n');
                const secondHalf = paragraphs.slice(midPoint).join('\n\n');
                
                // ルビパーサーを適用
                const firstHalfWithRuby = parseTextWithRuby(firstHalf);
                const secondHalfWithRuby = parseTextWithRuby(secondHalf);
                
                return (
                  <>
                    {/* 右側コラム（最初に表示） */}
                    <div className="reader-column">
                      <div 
                        className="reader-text"
                        dangerouslySetInnerHTML={{ __html: firstHalfWithRuby }}
                      />
                    </div>
                    
                    {/* 左側コラム */}
                    <div className="reader-column">
                      <div 
                        className="reader-text"
                        dangerouslySetInnerHTML={{ __html: secondHalfWithRuby }}
                      />
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </article>

        {/* ナビゲーションボタン（左側固定） */}
        <nav className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3">
          {prevChapter ? (
            <Link
              href={`/read/${workId}/${prevChapter.id}`}
              className="nav-button group"
              title="前の章"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </Link>
          ) : (
            <div className="nav-button opacity-30">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </div>
          )}

          <Link
            href={`/works/${workId}`}
            className="nav-button group"
            title="目次に戻る"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Link>

          {nextChapter ? (
            <Link
              href={`/read/${workId}/${nextChapter.id}`}
              className="nav-button group"
              title="次の章"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <div className="nav-button opacity-30">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </nav>
        </VerticalReader>
      </main>

    </div>
  );
}