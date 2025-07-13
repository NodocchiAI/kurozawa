import Link from 'next/link';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
  workCount?: number;
}

export default function AuthorCard({ author, workCount = 0 }: AuthorCardProps) {
  const lifespan = author.birthYear && author.deathYear 
    ? `${author.birthYear} - ${author.deathYear}`
    : author.birthYear 
    ? `${author.birthYear} - ?`
    : '生没年不詳';

  return (
    <Link href={`/authors/${author.id}`} className="group block">
      <article className="bg-gray-900/60 border border-gray-700 rounded-lg p-6 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 backdrop-blur-sm">
        <div className="flex flex-col h-full">
          <div className="text-center mb-4">
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-600 group-hover:border-red-400/50 transition-colors">
              <span className="text-2xl text-gray-400 font-serif">
                {author.name.charAt(0)}
              </span>
            </div>
            
            <h3 className="text-xl font-serif text-gray-200 mb-1 group-hover:text-red-300 transition-colors">
              {author.name}
            </h3>
            
            {author.pseudonym && (
              <p className="text-sm text-red-400 italic mb-2">
                {author.pseudonym}
              </p>
            )}
            
            <p className="text-xs text-gray-500">
              {lifespan}
            </p>
          </div>
          
          <div className="flex-1">
            <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
              {author.biography}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">時代:</span>
                <span className="text-gray-300">{author.era}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">作品数:</span>
                <span className="text-gray-300">{workCount}編</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
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
          
          {author.mysteriousBackground && (
            <div className="mt-auto p-3 bg-red-900/20 border border-red-700/50 rounded text-xs text-red-300 leading-relaxed">
              🔒 {author.mysteriousBackground}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}