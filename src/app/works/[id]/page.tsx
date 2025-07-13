import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getWork, getAuthor, getWorks } from '@/utils/content';

export function generateStaticParams() {
  const works = getWorks();
  return works.map((work) => ({
    id: work.id,
  }));
}

interface WorkPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const work = getWork(id);
  const author = work ? getAuthor(work.authorId) : null;

  if (!work || !author) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/" 
              className="text-red-400 hover:text-red-300 transition-colors text-sm"
            >
              ← 蔵書一覧に戻る
            </Link>
          </div>

          <article className="bg-gray-900/60 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
            <header className="mb-8">
              <h1 className="text-4xl font-serif text-gray-200 mb-4">
                {work.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Link 
                  href={`/authors/${author.id}`}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  {author.name}
                </Link>
                {author.pseudonym && (
                  <span className="text-gray-500">（{author.pseudonym}）</span>
                )}
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">
                  {work.publishedYear ? `${work.publishedYear}年` : '年代不詳'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {work.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-sm bg-red-900/30 text-red-300 rounded border border-red-800/50"
                  >
                    {g}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {work.description}
              </p>
              
              {work.forbiddenKnowledge && (
                <div className="mb-6 p-4 bg-purple-900/20 border border-purple-700/50 rounded text-purple-300">
                  ⚠️ {work.forbiddenKnowledge}
                </div>
              )}
            </header>

            <section>
              <h2 className="text-2xl font-serif text-gray-200 mb-6">目次</h2>
              <div className="space-y-3">
                {work.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="flex justify-between items-center p-4 bg-gray-800/40 border border-gray-600 rounded hover:border-red-400/50 transition-colors"
                  >
                    <div>
                      <Link 
                        href={`/read/${work.id}/${chapter.id}`}
                        className="text-gray-200 hover:text-red-300 transition-colors font-medium"
                      >
                        {chapter.title}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">
                        {chapter.characterCount.toLocaleString()}文字
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {chapter.publishedAt.toLocaleDateString('ja-JP')}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">章数:</span>
                  <span className="text-gray-200 ml-2">{work.chapters.length}章</span>
                </div>
                <div>
                  <span className="text-gray-400">総文字数:</span>
                  <span className="text-gray-200 ml-2">{work.totalCharacterCount.toLocaleString()}文字</span>
                </div>
                <div>
                  <span className="text-gray-400">状態:</span>
                  <span className="text-gray-200 ml-2">
                    {work.status === 'completed' ? '完結' : 
                     work.status === 'in_progress' ? '連載中' : '未完'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">時代:</span>
                  <span className="text-gray-200 ml-2">{author.era}</span>
                </div>
              </div>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-serif text-gray-200 mb-4">作家について</h3>
              <div className="bg-gray-800/40 rounded p-4">
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {author.biography}
                </p>
                {author.mysteriousBackground && (
                  <p className="text-red-300 text-xs italic">
                    🔒 {author.mysteriousBackground}
                  </p>
                )}
              </div>
            </section>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}