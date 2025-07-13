# 黒空文庫 (Kurozora Bunko)

## 概要

黒空文庫は、青空文庫をモチーフにした架空の小説サイトです。失われた作家たちと彼らの謎めいた作品を収蔵する、ダークで不気味な文学アーカイブとして設計されています。

## 特徴

- **ダークテーマ**: 不気味で神秘的な雰囲気のデザイン
- **架空の文学史**: オリジナルの作家と作品による文学世界
- **小説リーダー**: えあ草紙風の読みやすいリーダー機能
- **レスポンシブデザイン**: PC・スマートフォン対応
- **管理機能**: 作家・作品の追加・編集機能

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Noto Sans JP, Noto Serif JP

## ページ構成

### 公開ページ
- `/` - ホーム画面（蔵書一覧）
- `/authors` - 作家列伝
- `/authors/[id]` - 作家詳細ページ
- `/works/[id]` - 作品詳細ページ
- `/read/[workId]` - 小説リーダー（作品単体表示）

### 管理ページ
- `/admin` - 図書館管理画面

## セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 使用方法

### 基本的な閲覧

1. ホーム画面で作品や作家を閲覧
2. 作品カードをクリックして詳細ページへ
3. 目次から章を選んでリーダーで読む
4. 作家ページで作家の詳細情報を確認

### 管理機能

1. `/admin` にアクセス
2. 「新しい作家を追加」ボタンから作家情報を入力
3. 追加された作家が一覧に表示される

## データ構造

### Author (作家)
```typescript
interface Author {
  id: string;
  name: string;
  pseudonym?: string;  // ペンネーム
  birthYear?: number;
  deathYear?: number;
  biography: string;   // 略歴
  era: string;         // 時代
  genre: string[];     // ジャンル
  mysteriousBackground?: string;  // 謎めいた背景
}
```

### Work (作品)
```typescript
interface Work {
  id: string;
  title: string;
  authorId: string;
  publishedYear?: number;
  description: string;
  genre: string[];
  chapters: Chapter[];
  status: 'completed' | 'in_progress' | 'abandoned';
  totalCharacterCount: number;
  forbiddenKnowledge?: string;  // 禁断の知識
}
```

### Chapter (章)
```typescript
interface Chapter {
  id: string;
  workId: string;
  title: string;
  content: string;
  chapterNumber: number;
  publishedAt: Date;
  characterCount: number;
}
```

## デザインコンセプト

### カラーパレット
- **プライマリ**: `#0d0d0d` (深い黒)
- **セカンダリ**: `#1a1a1a` (濃いグレー)
- **アクセント**: `#8b0000` (ダークレッド), `#4a0e4e` (ダークパープル)
- **テキスト**: `#e0e0e0` (明るいグレー)

### タイポグラフィ
- **本文**: Noto Sans JP (軽量)
- **見出し・小説本文**: Noto Serif JP (セリフ)

### エフェクト
- ノイズテクスチャによる古書感
- グラデーション背景
- シャドウエフェクト

## カスタマイズ

### 新しい作品の追加

1. `/src/data/sample.ts` に新しいデータを追加
2. または管理画面からフォーム入力で追加

### デザインの変更

1. `/src/app/globals.css` でCSSカスタムプロパティを編集
2. Tailwindのユーティリティクラスを使用

### 新しいページの追加

1. `/src/app/` 以下に新しいディレクトリを作成
2. `page.tsx` ファイルを作成
3. 必要に応じてAPIルートを追加

## 🎯 2024年進捗まとめ

### ✅ 完了済み（えあ草紙完全再現）
- **📚 基本リーダー機能**: 縦書き・ルビ・2カラム完全対応
- **🔧 Easoshi分析ベース改善**: Canvas文字幅測定・動的レイアウト
- **📖 構造改善**: 章概念撤廃→作品単体表示 (`/read/[workId]`)
- **🎨 UI/UX**: えあ草紙風境界線・影・29行表示・最適フォント
- **🛠️ 見切れ問題解決**: 右カラム完全表示・長文対応

### 🔧 主要技術実装
```
src/utils/textMeasurement.ts      # Canvas精密測定
src/components/reader/EasoshiReader.tsx  # 動的リーダー
src/app/read/[workId]/page.tsx     # 新ルーティング
```

### 📚 テスト作品
- **無底の穴** (`/read/musoko-no-ana`) - 3章構成・長文テスト対応

## 今後の拡張予定

- [ ] ページめくり機能（左右キー）
- [ ] しおり機能
- [ ] フォントサイズ調整UI
- [ ] 作品の編集機能
- [ ] 検索機能
- [ ] データベース統合

## ライセンス

このプロジェクトは学習・実験目的で作成されたものです。
架空の作品・作家であり、実在の人物・団体とは一切関係ありません。

## 注意事項

- 当サイトの全ての作品は架空のものです
- 深夜の閲覧は推奨いたしません
- 読後の悪夢や幻覚について、責任は負いかねます