'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { parseTextWithRuby } from '@/utils/rubyParser';
import { calculateOptimalSplit, calculateCharactersPerLine } from '@/utils/textMeasurement';

interface EasoshiReaderProps {
  content: string;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
}

export default function EasoshiReader({ content, fontSize: externalFontSize }: EasoshiReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });
  const [fontSize, setFontSize] = useState(externalFontSize || 16);

  // 外部からのフォントサイズ変更を反映
  useEffect(() => {
    if (externalFontSize !== undefined) {
      setFontSize(externalFontSize);
    }
  }, [externalFontSize]);

  // クライアント側でのローカル保存フォントサイズ読み込み
  useEffect(() => {
    if (!externalFontSize) {
      const saved = localStorage.getItem('kurozora-font-size');
      if (saved) {
        setFontSize(parseInt(saved));
      }
    }
  }, [externalFontSize]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // ページ変更の関数
  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  // キーボードイベント処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'h':
          nextPage(); // 左キーで次のページ（右→左読み）
          break;
        case 'ArrowRight':
        case 'l':
          prevPage(); // 右キーで前のページ
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  // 自動フォントサイズ調整を無効化（手動調整を優先）
  // useEffect(() => {
  //   const optimalSize = calculateOptimalFontSize(
  //     content,
  //     containerSize.width,
  //     containerSize.height,
  //     17
  //   );
  //   setFontSize(optimalSize);
  // }, [content, containerSize]);

  // テキストを適切に処理
  const cleanContent = content
    .replace(/^#.*$/gm, '') // 見出しを除去
    .trim();
  
  // 段落を適切に分割（MDファイル上の改行を尊重）
  const paragraphs = cleanContent
    .split('\n\n')
    .filter(p => p.trim().length > 0)
    .map(p => p.trim()); // 改行は除去せずそのまま保持

  // 全体をページ分割
  const pagesData = useMemo(() => {
    const pages: Array<{firstHalf: string[], secondHalf: string[]}> = [];
    let remainingParagraphs = [...paragraphs];
    
    while (remainingParagraphs.length > 0) {
      const { firstHalf, secondHalf, processedCount } = calculateOptimalSplit(
        remainingParagraphs,
        fontSize,
        containerSize.width,
        containerSize.height
      );
      
      pages.push({ firstHalf, secondHalf });
      remainingParagraphs = remainingParagraphs.slice(processedCount);
      
      if (processedCount === 0) break; // 無限ループ防止
    }
    
    return pages;
  }, [paragraphs, fontSize, containerSize]);

  // 総ページ数を更新
  useEffect(() => {
    setTotalPages(pagesData.length);
    if (currentPage >= pagesData.length) {
      setCurrentPage(Math.max(0, pagesData.length - 1));
    }
  }, [pagesData, currentPage]);

  // 現在のページデータ
  const currentPageData = pagesData[currentPage] || { firstHalf: [], secondHalf: [] };

  console.log('現在のフォントサイズ:', fontSize); // デバッグ
  console.log('適用するCSSスタイル:', `${fontSize}px`); // デバッグ

  return (
    <div 
      ref={containerRef}
      className="reader-main"
      style={{ 
        fontSize: `${fontSize}px`,
        lineHeight: 1.6 
      }}
      onClick={nextPage} // クリックで次のページ
    >
      <div className="reader-content-wrapper">
        {/* 右側コラム（最初に表示） */}
        <div className="reader-column">
          <div className="reader-text">
            {currentPageData.firstHalf.map((paragraph, index) => (
              <p 
                key={index} 
                className="reader-paragraph"
                dangerouslySetInnerHTML={{ __html: parseTextWithRuby(paragraph) }}
              />
            ))}
          </div>
        </div>
        
        {/* 左側コラム */}
        <div className="reader-column">
          <div className="reader-text">
            {currentPageData.secondHalf.map((paragraph, index) => (
              <p 
                key={index} 
                className="reader-paragraph"
                dangerouslySetInnerHTML={{ __html: parseTextWithRuby(paragraph) }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* ページインジケーター */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
        {currentPage + 1} / {totalPages}
      </div>
      
      
      {/* ナビゲーションヒント */}
      <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
        ← → キーまたはクリックでページ移動<br/>
        文字数/行: {calculateCharactersPerLine(fontSize)}
      </div>
    </div>
  );
}