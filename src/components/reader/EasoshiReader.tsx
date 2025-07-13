'use client';

import { useEffect, useState, useRef } from 'react';
import { parseTextWithRuby } from '@/utils/rubyParser';
import { calculateOptimalSplit, calculateOptimalFontSize } from '@/utils/textMeasurement';

interface EasoshiReaderProps {
  content: string;
}

export default function EasoshiReader({ content }: EasoshiReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });
  const [fontSize, setFontSize] = useState(16);

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

  useEffect(() => {
    // コンテンツに基づいて最適なフォントサイズを計算
    const optimalSize = calculateOptimalFontSize(
      content,
      containerSize.width,
      containerSize.height,
      17 // ベースフォントサイズ
    );
    setFontSize(optimalSize);
  }, [content, containerSize]);

  // テキストを適切に処理
  const cleanContent = content
    .replace(/^#.*$/gm, '') // 見出しを除去
    .trim();
  
  // 段落を適切に分割
  const paragraphs = cleanContent
    .split('\n\n')
    .filter(p => p.trim().length > 0)
    .map(p => p.replace(/\n/g, '').trim());

  // Easoshi風の動的分割
  const { firstHalf, secondHalf } = calculateOptimalSplit(
    paragraphs,
    fontSize,
    containerSize.width,
    containerSize.height
  );

  return (
    <div 
      ref={containerRef}
      className="reader-main"
      style={{ 
        fontSize: `${fontSize}px`,
        lineHeight: 1.6 
      }}
    >
      <div className="reader-content-wrapper">
        {/* 右側コラム（最初に表示） */}
        <div className="reader-column">
          <div className="reader-text">
            {firstHalf.map((paragraph, index) => (
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
            {secondHalf.map((paragraph, index) => (
              <p 
                key={index} 
                className="reader-paragraph"
                dangerouslySetInnerHTML={{ __html: parseTextWithRuby(paragraph) }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}