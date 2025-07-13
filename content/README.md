# コンテンツ追加ガイド

黒空文庫のコンテンツは、Markdownファイルで管理されています。
VSCodeなどのテキストエディタで簡単に作品や作家を追加できます。

## ディレクトリ構造

```
content/
├── authors/     # 作家情報
├── works/       # 作品情報
└── chapters/    # 章・本文
```

## 作家の追加

`content/authors/` ディレクトリに新しい `.md` ファイルを作成します。

### ファイル名
- `作家名-英数字.md` (例: `tanizaki-junichiro.md`)

### フォーマット例

```markdown
---
id: tanizaki-junichiro
name: 谷崎 潤一郎
pseudonym: 悪魔主義者
birthYear: 1886
deathYear: 1965
era: 明治・大正・昭和
genre:
  - 耽美
  - 古典
  - 幻想
mysteriousBackground: 関西弁への異常な執着の背景には、ある秘密の体験があったとされる
---

# 谷崎 潤一郎

ここに作家の略歴を記述します。
Markdownの記法が使用できます。

## 経歴

- 1886年: 東京生まれ
- 1910年: 『刺青』でデビュー
...
```

### 必須フィールド
- `id`: 一意の識別子（英数字とハイフン）
- `name`: 作家名
- `era`: 時代
- `genre`: ジャンル（配列）

### オプションフィールド
- `pseudonym`: ペンネーム
- `birthYear`: 生年
- `deathYear`: 没年
- `mysteriousBackground`: 謎めいた背景

## 作品の追加

`content/works/` ディレクトリに新しい `.md` ファイルを作成します。

### ファイル名
- `作品名-英数字.md` (例: `sasameyuki.md`)

### フォーマット例

```markdown
---
id: sasameyuki
title: 細雪
authorId: tanizaki-junichiro
publishedYear: 1948
status: completed
genre:
  - 家族小説
  - 古典
forbiddenKnowledge: この作品に描かれた家族の秘密は、実在の事件に基づいているとされる
---

# 細雪

ここに作品の説明を記述します。

## あらすじ

関西の旧家蒔岡家の四姉妹を描いた長編小説...
```

### 必須フィールド
- `id`: 一意の識別子
- `title`: 作品タイトル
- `authorId`: 作家のID（authorsで定義したもの）

### オプションフィールド
- `publishedYear`: 発表年
- `status`: 状態（completed, in_progress, abandoned）
- `genre`: ジャンル（配列）
- `forbiddenKnowledge`: 禁断の知識

## 章の追加

`content/chapters/` ディレクトリに新しい `.md` ファイルを作成します。

### ファイル名
- `作品ID-章番号.md` (例: `sasameyuki-01.md`)

### フォーマット例

```markdown
---
id: sasameyuki-01
workId: sasameyuki
title: 第一章　雪景色
chapterNumber: 1
publishedAt: 1943-01-01
---

# 第一章　雪景色

蒔岡家の長女鶴子は、その日も妹たちのことを思っていた。

雪が降り始めた午後のことである。庭の松の枝に...

（本文をここに記述）
```

### 必須フィールド
- `id`: 一意の識別子
- `workId`: 作品のID
- `title`: 章のタイトル
- `chapterNumber`: 章番号
- `publishedAt`: 発表日（YYYY-MM-DD形式）

## コンテンツの更新

1. 新しいMarkdownファイルを追加
2. サイトをリビルド（`npm run build`）
3. GitHub Pagesに自動デプロイ

## 注意事項

- IDは英数字とハイフンのみ使用
- 日付はYYYY-MM-DD形式で記述
- 配列は YAML形式で記述（`-` で始める）
- 本文はMarkdown記法で記述可能

## 例: 新しい作家と作品を追加

1. `content/authors/akutagawa-ryunosuke.md` を作成
2. `content/works/rashomon.md` を作成
3. `content/chapters/rashomon-01.md` を作成
4. コミット&プッシュで自動デプロイ