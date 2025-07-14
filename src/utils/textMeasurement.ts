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

// フォントサイズに基づく動的文字数制限計算
export function calculateCharactersPerLine(fontSize: number): number {
  // フォントサイズに応じた文字数制限（基準：16px=55文字）
  const baseSize = 16;
  const baseChars = 55;
  return Math.floor(baseChars * (baseSize / fontSize));
}

// シンプルな文字数制限＋MD改行尊重のロジック
export function calculateOptimalSplit(
  paragraphs: string[],
  fontSize: number,
  _containerWidth: number,
  containerHeight: number
): { firstHalf: string[], secondHalf: string[], processedCount: number } {
  const lineHeight = fontSize * 1.6;
  const maxLinesPerColumn = Math.floor((containerHeight - fontSize * 4) / lineHeight) + 3; // 3行追加
  const charactersPerLine = calculateCharactersPerLine(fontSize); // 動的文字数制限
  
  const firstColumnContent: string[] = [];
  const secondColumnContent: string[] = [];
  let firstColumnLines = 0;
  let secondColumnLines = 0;
  let processedParagraphs = 0;
  
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    
    // MD改行を尊重した行分割
    const mdLines = paragraph.split('\n').filter(line => line.trim().length > 0);
    const processedLines: string[] = [];
    
    // 各MD行を文字数制限で分割
    for (const mdLine of mdLines) {
      if (mdLine.length <= charactersPerLine) {
        processedLines.push(mdLine);
      } else {
        // 文字数制限を超える場合は分割
        for (let j = 0; j < mdLine.length; j += charactersPerLine) {
          processedLines.push(mdLine.slice(j, j + charactersPerLine));
        }
      }
    }
    
    const paragraphLineCount = processedLines.length + 1; // 段落間スペース
    
    // 第1カラムに収まるかチェック
    if (firstColumnLines + paragraphLineCount <= maxLinesPerColumn) {
      firstColumnContent.push(processedLines.join('\n'));
      firstColumnLines += paragraphLineCount;
      processedParagraphs = i + 1;
    }
    // 第2カラムに収まるかチェック
    else if (secondColumnLines + paragraphLineCount <= maxLinesPerColumn) {
      secondColumnContent.push(processedLines.join('\n'));
      secondColumnLines += paragraphLineCount;
      processedParagraphs = i + 1;
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