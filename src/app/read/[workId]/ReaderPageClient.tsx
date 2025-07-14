'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VerticalReader from '@/components/reader/VerticalReader';
import EasoshiReader from '@/components/reader/EasoshiReader';
import ReaderMenu from '@/components/reader/ReaderMenu';
import { Work, Author } from '@/types';

interface ReaderPageClientProps {
  work: Work;
  author: Author;
  fullContent: string;
  workId: string;
}

export default function ReaderPageClient({ work, author, fullContent, workId }: ReaderPageClientProps) {
  const [fontSize, setFontSize] = useState(16);
  
  // フォントサイズの初期化（クライアント側のみ）
  useEffect(() => {
    const saved = localStorage.getItem('kurozora-font-size');
    if (saved) {
      setFontSize(parseInt(saved));
    }
  }, []);

  // フォントサイズ変更ハンドラー
  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    localStorage.setItem('kurozora-font-size', newSize.toString());
  };

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
                {work.title}
              </div>
            </div>
            
            {/* ヘッダーにメニューを配置 */}
            <ReaderMenu 
              fontSize={fontSize}
              onFontSizeChange={handleFontSizeChange}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <VerticalReader workId={workId}>
          {/* ダークモード背景 */}
          <div className="absolute inset-0 bg-black" />
        
        <article className="relative h-full overflow-hidden">
          {/* Easoshi風リーダー */}
          <EasoshiReader 
            content={fullContent} 
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />
        </article>
        </VerticalReader>
      </main>

    </div>
  );
}