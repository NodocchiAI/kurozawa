import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WorkCard from '@/components/ui/WorkCard';
import { getAuthor, getWorks, getAuthors } from '@/utils/content';

export function generateStaticParams() {
  const authors = getAuthors();
  return authors.map((author) => ({
    id: author.id,
  }));
}

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const author = getAuthor(id);
  const allWorks = getWorks();
  const works = allWorks.filter(w => w.authorId === id);

  if (!author) {
    notFound();
  }

  const lifespan = author.birthYear && author.deathYear 
    ? `${author.birthYear} - ${author.deathYear}`
    : author.birthYear 
    ? `${author.birthYear} - ?`
    : '生没年不詳';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/authors" 
              className="text-red-400 hover:text-red-300 transition-colors text-sm"
            >
              ← 作家列伝に戻る
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-6 backdrop-blur-sm sticky top-8">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border-4 border-gray-600">
                    <span className="text-4xl text-gray-400 font-serif">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-serif text-gray-200 mb-2">
                    {author.name}
                  </h1>
                  
                  {author.pseudonym && (
                    <p className="text-lg text-red-400 italic mb-2">
                      {author.pseudonym}
                    </p>
                  )}
                  
                  <p className="text-gray-400">
                    {lifespan}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">時代</h3>
                    <p className="text-gray-200">{author.era}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">主なジャンル</h3>
                    <div className="flex flex-wrap gap-2">
                      {author.genre.map((g) => (
                        <span
                          key={g}
                          className="px-2 py-1 text-xs bg-purple-900/30 text-purple-300 rounded border border-purple-800/50"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">作品数</h3>
                    <p className="text-gray-200">{works.length}編</p>
                  </div>
                </div>

                {author.mysteriousBackground && (
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-700/50 rounded">
                    <h3 className="text-sm font-semibold text-red-400 mb-2">謎</h3>
                    <p className="text-red-300 text-sm leading-relaxed">
                      {author.mysteriousBackground}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-serif text-gray-200 mb-6">略歴</h2>
                <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-6">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {author.biography}
                  </p>
                </div>
              </section>

              {works.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-gray-200 mb-6">作品一覧</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {works.map((work) => (
                      <WorkCard key={work.id} work={work} author={author} />
                    ))}
                  </div>
                </section>
              )}

              {works.length === 0 && (
                <section>
                  <h2 className="text-2xl font-serif text-gray-200 mb-6">作品一覧</h2>
                  <div className="bg-gray-900/40 border border-gray-700 rounded-lg p-8 text-center">
                    <p className="text-gray-400">
                      現在、この作家の作品は収蔵されていません。
                      <br />
                      近日中に新たな発見があるかもしれません...
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>

          <section className="bg-gray-900/40 border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-serif text-red-400 mb-4 text-center">
              研究者への注意
            </h2>
            <div className="max-w-3xl mx-auto text-gray-300 text-sm leading-relaxed space-y-3">
              <p>
                この作家に関する資料は、複数の異なる情報源から収集されたものです。
                一部の記録には矛盾が見られ、真偽のほどは定かではありません。
              </p>
              <p>
                特に失踪期間や謎の体験については、超自然的な要素を含む証言が多く、
                学術的な検証が困難な状況にあります。
              </p>
              <p>
                研究の際は、十分な注意を払い、可能な限り複数の資料を照合することを推奨します。
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}