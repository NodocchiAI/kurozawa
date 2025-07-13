import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthorCard from '@/components/ui/AuthorCard';
import { getAuthors, getWorks } from '@/utils/content';

export default function AuthorsPage() {
  const authors = getAuthors();
  const works = getWorks();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-red-400 mb-6 text-shadow-dark">
            作家列伝
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            失われた文学史に名を刻む、謎に満ちた作家たちの足跡を辿る。
            <br />
            彼らの生涯には、語られることのない秘密が隠されている。
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => {
              const workCount = works.filter(w => w.authorId === author.id).length;
              return (
                <AuthorCard key={author.id} author={author} workCount={workCount} />
              );
            })}
          </div>
        </section>

        <section className="mt-16 text-center bg-gray-900/40 border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-serif text-red-400 mb-4">
            失われた作家たち
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            ここに記録された作家たちは、正史には残らなかった文学者たちです。
            彼らの作品は、時として現実と虚構の境界を揺るがし、
            読む者の精神に深い影響を与えると言われています。
            <br /><br />
            各作家の詳細な経歴や、作品に込められた真の意味については、
            慎重に研究を進めることをお勧めします。
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}