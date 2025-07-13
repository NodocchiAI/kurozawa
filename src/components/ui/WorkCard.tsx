import Link from 'next/link';
import { Work, Author } from '@/types';

interface WorkCardProps {
  work: Work;
  author: Author;
}

export default function WorkCard({ work, author }: WorkCardProps) {
  return (
    <Link href={`/works/${work.id}`} className="group block">
      <article className="bg-gray-900/60 border border-gray-700 rounded-lg p-6 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 backdrop-blur-sm">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-xl font-serif text-gray-200 mb-2 group-hover:text-red-300 transition-colors line-clamp-2">
              {work.title}
            </h3>
            
            <p className="text-sm text-gray-400 mb-3 font-sans">
              著者: <span className="text-red-400">{author.name}</span>
              {author.pseudonym && (
                <span className="text-gray-500 ml-2">（{author.pseudonym}）</span>
              )}
            </p>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
              {work.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {work.genre.map((g) => (
                <span
                  key={g}
                  className="px-2 py-1 text-xs bg-red-900/30 text-red-300 rounded border border-red-800/50"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-gray-700">
            <span>
              {work.publishedYear ? `${work.publishedYear}年` : '年代不詳'}
            </span>
            <span>
              {work.chapters.length}章 / {work.totalCharacterCount.toLocaleString()}文字
            </span>
          </div>
          
          {work.forbiddenKnowledge && (
            <div className="mt-3 p-2 bg-purple-900/20 border border-purple-700/50 rounded text-xs text-purple-300">
              ⚠️ {work.forbiddenKnowledge}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}