import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWork, getAuthor, getChapter, getChapters } from '@/utils/content';
import VerticalReader from '@/components/reader/VerticalReader';

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
    <div className="h-screen flex flex-col bg-amber-100">
      <div className="grain-overlay" />
      
      <header className="sticky top-0 z-50 bg-amber-50/95 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/works/${workId}`}
                className="text-amber-700 hover:text-amber-600 transition-colors text-sm font-medium"
              >
                ← 作品に戻る
              </Link>
              <div className="text-amber-600 text-sm">
                {work.title} / {chapter.title}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-amber-600">
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
          {/* 草紙風背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100" />
          <div className="absolute inset-0 paper-texture" />
          <div className="absolute inset-0 paper-shadow" />
        
        <article className="relative h-full overflow-auto">
          {/* 章タイトルエリア（右上） */}
          <div className="absolute top-8 right-8 text-right z-10">
            <h1 className="text-2xl font-serif text-amber-900 mb-2 vertical-text">
              {chapter.title}
            </h1>
            <div className="text-amber-700 text-sm vertical-text">
              <div>{author.name}</div>
              {author.pseudonym && <div className="mt-1">（{author.pseudonym}）</div>}
            </div>
          </div>

          {/* 縦書きコンテンツエリア */}
          <div className="vertical-reader h-full pt-16 pr-24 pl-8 pb-8">
            <div className="vertical-text text-xl leading-relaxed text-amber-900 h-full font-serif">
              {chapter.content.split('\n\n').map((paragraph, index) => (
                <div key={index} className="vertical-paragraph">
                  {paragraph.split('').map((char, charIndex) => {
                    // 数字の処理
                    if (/\d/.test(char)) {
                      return <span key={charIndex} className="number">{char}</span>;
                    }
                    // 句読点の処理
                    if (/[。、！？]/.test(char)) {
                      return <span key={charIndex} className="punctuation">{char}</span>;
                    }
                    return char;
                  })}
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* ナビゲーションボタン（左側固定） */}
        <nav className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-4">
          {prevChapter ? (
            <Link
              href={`/read/${workId}/${prevChapter.id}`}
              className="vertical-nav-button group"
              title="前の章"
            >
              <svg className="w-5 h-5 text-amber-700 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </Link>
          ) : (
            <div className="vertical-nav-button opacity-30">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </div>
          )}

          <Link
            href={`/works/${workId}`}
            className="vertical-nav-button group"
            title="目次に戻る"
          >
            <svg className="w-5 h-5 text-amber-700 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Link>

          {nextChapter ? (
            <Link
              href={`/read/${workId}/${nextChapter.id}`}
              className="vertical-nav-button group"
              title="次の章"
            >
              <svg className="w-5 h-5 text-amber-700 group-hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <div className="vertical-nav-button opacity-30">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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