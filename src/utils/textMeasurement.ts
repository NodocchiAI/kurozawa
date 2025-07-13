/**
 * Easoshiの分析に基づく精密な文字幅測定ユーティリティ
 */

// Canvas contextを使った正確な文字幅測定
export function measureTextWidth(text: string, fontSize: number, fontFamily: string = 'Noto Serif JP'): number {
  if (typeof window === 'undefined') return text.length * fontSize * 0.5; // SSR対応
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return text.length * fontSize * 0.5;
  
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}

// 実際の文字幅に基づくカラム幅計算
export function calculateOptimalColumnWidth(
  content: string, 
  fontSize: number, 
  containerWidth: number,
  fontFamily: string = 'Noto Serif JP'
): number {
  const lines = content.split('\n');
  let maxLineWidth = 0;
  
  for (const line of lines) {
    const lineWidth = measureTextWidth(line, fontSize, fontFamily);
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }
  
  const padding = fontSize * 3; // パディング
  const optimalWidth = maxLineWidth + padding;
  const maxColumnWidth = (containerWidth - fontSize) / 2; // 境界線スペースを考慮
  
  return Math.min(optimalWidth, maxColumnWidth);
}

// 文字数ベースの動的分割（Easoshi風）
export function calculateOptimalSplit(
  paragraphs: string[],
  fontSize: number,
  containerWidth: number,
  containerHeight: number,
  fontFamily: string = 'Noto Serif JP'
): { firstHalf: string[], secondHalf: string[] } {
  const lineHeight = fontSize * 1.6;
  const maxLinesPerColumn = Math.floor((containerHeight - fontSize * 3) / lineHeight);
  
  let firstColumnLines = 0;
  let splitIndex = 0;
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const paragraphWidth = measureTextWidth(paragraph, fontSize, fontFamily);
    const columnWidth = (containerWidth - fontSize) / 2;
    
    // 段落が何行になるかを計算
    const linesInParagraph = Math.ceil(paragraphWidth / columnWidth) + 1; // +1 for margin
    
    if (firstColumnLines + linesInParagraph > maxLinesPerColumn) {
      break;
    }
    
    firstColumnLines += linesInParagraph;
    splitIndex = i + 1;
  }
  
  return {
    firstHalf: paragraphs.slice(0, splitIndex),
    secondHalf: paragraphs.slice(splitIndex)
  };
}

// 動的フォントサイズ調整
export function calculateOptimalFontSize(
  content: string,
  containerWidth: number,
  containerHeight: number,
  baseFontSize: number = 16
): number {
  const maxLines = Math.floor(containerHeight / (baseFontSize * 1.6));
  const avgCharsPerLine = (containerWidth / 2) / (baseFontSize * 0.6);
  
  const totalChars = content.length;
  const estimatedLines = totalChars / avgCharsPerLine;
  
  if (estimatedLines > maxLines * 2) {
    // テキストが多すぎる場合はフォントサイズを小さく
    return Math.max(baseFontSize * 0.8, 12);
  }
  
  return baseFontSize;
}