import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWork, getAuthor, getChapter, getChapters } from '@/utils/content';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="grain-overlay" />
      
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/works/${workId}`}
                className="text-red-400 hover:text-red-300 transition-colors text-sm"
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="reader-content">
          <header className="mb-8 text-center border-b border-gray-600 pb-6">
            <h1 className="text-3xl font-serif text-gray-200 mb-2">
              {chapter.title}
            </h1>
            <div className="text-gray-400 text-sm">
              <span>{author.name}</span>
              {author.pseudonym && <span className="ml-2">（{author.pseudonym}）</span>}
            </div>
            <div className="text-gray-500 text-xs mt-2">
              {chapter.publishedAt.toLocaleDateString('ja-JP')} 発表 | {chapter.characterCount.toLocaleString()}文字
            </div>
          </header>

          <div className="prose-dark max-w-none">
            {chapter.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <nav className="mt-12 pt-8 border-t border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              {prevChapter ? (
                <Link
                  href={`/read/${workId}/${prevChapter.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-600 rounded hover:border-red-400/50 transition-colors text-gray-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  前の章
                </Link>
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  最初の章です
                </div>
              )}
            </div>

            <Link
              href={`/works/${workId}`}
              className="px-4 py-2 bg-red-900/30 border border-red-700 rounded hover:bg-red-900/50 transition-colors text-red-300"
            >
              目次に戻る
            </Link>

            <div>
              {nextChapter ? (
                <Link
                  href={`/read/${workId}/${nextChapter.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 border border-gray-600 rounded hover:border-red-400/50 transition-colors text-gray-200"
                >
                  次の章
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  最後の章です
                </div>
              )}
            </div>
          </div>
        </nav>
      </main>

    </div>
  );
}