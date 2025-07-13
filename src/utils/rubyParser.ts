/**
 * ルビ（ふりがな）パーサー
 * 無底[むてい] 形式のテキストをHTMLのrubyタグに変換
 */

export function parseRuby(text: string): string {
  // 漢字[ひらがな/カタカナ] パターンをrubyタグに変換
  const rubyPattern = /([一-龯々〆〤]+)\[([ぁ-んァ-ヶ]+)\]/g;
  
  return text.replace(rubyPattern, (match, kanji, reading) => {
    return `<ruby class="ruby">${kanji}<rt>${reading}</rt></ruby>`;
  });
}

/**
 * 複数行のテキストに対してルビパーサーを適用
 */
export function parseTextWithRuby(content: string): string {
  return content
    .split('\n')
    .map(line => parseRuby(line))
    .join('\n');
}