import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WorkCard from '@/components/ui/WorkCard';
import AuthorCard from '@/components/ui/AuthorCard';
import { getWorks, getAuthors } from '@/utils/content';

export default function Home() {
  const works = getWorks();
  const authors = getAuthors();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-red-400 mb-6 text-shadow-dark">
            禁断の小説墓場
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            現実と幻想の境界に存在する、もう一つの文学世界へようこそ。
            <br />
            ここには失われた作家たちの魂と、語られることのなかった物語が眠っています。
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-serif text-gray-200 mb-8 text-center">
            📚 蔵書から
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work) => {
              const author = authors.find(a => a.id === work.authorId);
              if (!author) return null;
              return (
                <WorkCard key={work.id} work={work} author={author} />
              );
            })}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-serif text-gray-200 mb-8 text-center">
            ✍️ 作家列伝
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => {
              const workCount = works.filter(w => w.authorId === author.id).length;
              return (
                <AuthorCard key={author.id} author={author} workCount={workCount} />
              );
            })}
          </div>
        </section>

        <section className="text-center bg-gray-900/40 border border-gray-700 rounded-lg p-8">
          <h3 className="text-xl font-serif text-red-400 mb-4">
            ⚠️ 閲覧時の注意
          </h3>
          <div className="space-y-3 text-gray-300 text-sm max-w-2xl mx-auto">
            <p>• 当図書館の作品は全て架空のものです</p>
            <p>• 深夜の閲覧は精神への影響を考慮してください</p>
            <p>• 一部の作品には現実に影響を与える可能性のある記述が含まれています</p>
            <p>• 読後の悪夢や幻覚について、当館は一切の責任を負いません</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
