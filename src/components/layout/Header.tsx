import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <h1 className="text-3xl font-bold text-red-400 font-serif group-hover:text-red-300 transition-colors duration-300 text-shadow-dark">
              黒空文庫
            </h1>
            <p className="text-sm text-gray-400 font-sans -mt-1">
              KUROZORA BUNKO
            </p>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-sans"
            >
              蔵書一覧
            </Link>
            <Link 
              href="/authors" 
              className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-sans"
            >
              作家列伝
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-sans"
            >
              図書館管理
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-red-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}