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

// えあ草紙風の精密な文字ベース分割
export function calculateOptimalSplit(
  paragraphs: string[],
  fontSize: number,
  containerWidth: number,
  containerHeight: number
): { firstHalf: string[], secondHalf: string[], processedCount: number } {
  const lineHeight = fontSize * 1.6;
  const maxLinesPerColumn = Math.floor((containerHeight - fontSize * 4) / lineHeight); // より厳密なマージン
  const columnWidth = (containerWidth - fontSize * 2) / 2; // カラム間のスペースを考慮
  const charactersPerLine = Math.floor(columnWidth / (fontSize * 0.6)); // 1文字あたりの幅を調整
  
  const firstColumnContent: string[] = [];
  const secondColumnContent: string[] = [];
  let firstColumnLines = 0;
  let secondColumnLines = 0;
  let processedParagraphs = 0;
  
  // 段落を文字単位で処理
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const paragraphLines = Math.ceil(paragraph.length / charactersPerLine);
    
    // 第1カラムに収まるかチェック
    if (firstColumnLines + paragraphLines <= maxLinesPerColumn) {
      firstColumnContent.push(paragraph);
      firstColumnLines += paragraphLines + 1; // 段落間スペース
      processedParagraphs = i + 1;
    } 
    // 第2カラムに収まるかチェック
    else if (secondColumnLines + paragraphLines <= maxLinesPerColumn) {
      secondColumnContent.push(paragraph);
      secondColumnLines += paragraphLines + 1;
      processedParagraphs = i + 1;
    }
    // どちらにも収まらない場合は、段落を分割
    else if (firstColumnContent.length === 0 && secondColumnContent.length === 0) {
      // 長い段落を強制的に分割
      const availableLines = maxLinesPerColumn;
      const maxChars = availableLines * charactersPerLine;
      if (paragraph.length > maxChars) {
        firstColumnContent.push(paragraph.substring(0, maxChars));
        processedParagraphs = i; // 部分的に処理
        break;
      } else {
        firstColumnContent.push(paragraph);
        processedParagraphs = i + 1;
      }
      break;
    }
    // これ以上入らない場合は終了
    else {
      break;
    }
  }
  
  // 最低1段落は処理するように保証
  if (processedParagraphs === 0 && paragraphs.length > 0) {
    firstColumnContent.push(paragraphs[0]);
    processedParagraphs = 1;
  }
  
  return {
    firstHalf: firstColumnContent,
    secondHalf: secondColumnContent,
    processedCount: processedParagraphs
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