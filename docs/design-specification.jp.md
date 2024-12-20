# AQZ Tech Chronicle 設計仕様書

## 1. プロジェクト概要

### 基本方針

AQZ Tech Chronicleは、独自のオリジナルテーマを採用した技術ブログシステムとして開発します。コンテンツの読みやすさとユーザビリティを重視し、AQZのブランドアイデンティティを反映したデザインを実装します。

### 主要機能

- 記事一覧表示
- 記事詳細表示
- カテゴリ/タグによる記事フィルタリング
- シリーズ記事のナビゲーション
- ダークモード切替
- レスポンシブデザイン

## 2. コンポーネント設計

### リソース

```typescript
src/
└── assets/
    ├── images/      # ブログ記事で使用する画像
    │   └── blog/    # 記事ごとに整理された画像
    └── brand/       # ロゴなどのブランドアセット
        └── logo.svg # ロゴ画像

public/
└── favicon.svg      # ファビコン
```

- ブログ画像は src/assets/images/ で管理され、Astroの画像最適化が適用されます
- ロゴなどのブランドアセットは src/assets/brand/ で集中管理できます
- ファビコンは public/ に配置し、ブラウザから直接アクセス可能です
- パスエイリアスがより明確になり、保守性が向上します

### パスエイリアス

``tsconfig.ts``に以下のように定義する。

```typescript
    "paths": {
      "@/assets/*": [
        "src/assets/*"
      ],
      "@/components/*": [
        "src/components/*.astro"
      ],
      "@/layouts/*": [
        "src/layouts/*.astro"
      ],
      "@/data/*": [
        "src/data/*"
      ],
      "@/config/*": [
        "src/config/*"
      ],
      "@/site-config": [
        "src/config/site.config.ts"
      ],
      "@/styles/*": [
        "src/styles/*.css"
      ],
      "@/types/*": [
        "src/types/*"
      ],
      "@/utils/*": [
        "src/utils/*.ts"
      ]
    },
```

### ベースレイアウト構成

```typescript
layouts/
  ├── Layout.astro        // 基本レイアウト
  └── BlogPost.astro      // ブログ記事用レイアウト
```

これらのレイアウトコンポーネントは以下の機能を実装します：

- ダークモードコンテキストの提供と管理
- ベースヘッドコンポーネントの統合
- ViewTransitionsの実装
- 基本的なページ構造の提供
- メタデータの管理とSEO最適化基盤

### コアコンポーネント群

#### ヘッダーコンポーネント

```typescript
components/Header/
  ├── Header.astro        // メインヘッダー
  ├── Navigation.astro    // ナビゲーションメニュー
  ├── ThemeToggle.astro   // ダークモード切替
  └── SearchBar.astro     // 検索バー
```

実装詳細：

- 固定ヘッダー（スクロール時も表示）
- レスポンシブなナビゲーションメニュー
  - モバイル時：ハンバーガーメニュー
  - デスクトップ時：横並びメニュー
- ダークモード切替ボタン
  - LocalStorageでの設定保存
  - システム設定との連携
- 検索機能の統合

#### フッターコンポーネント

```typescript
components/Footer/
  ├── Footer.astro        // メインフッター
  └── SocialLinks.astro   // ソーシャルリンク
```

実装内容：

- コピーライト表示
- 会社情報リンク
- プライバシーポリシーリンク
- GitHubリポジトリリンク

#### サイドバーコンポーネント

```typescript
components/Sidebar/
  ├── Sidebar.astro       // メインサイドバー
  ├── Profile.astro       // プロフィール
  ├── Categories.astro    // カテゴリー一覧
  └── TagCloud.astro      // タグクラウド
```

実装詳細：

- スティッキーポジショニング
- レスポンシブ対応：
  - デスクトップ（1024px以上）：右側固定表示、全要素表示
  - タブレット（768px～1023px）：記事下部グリッド、横並び表示
  - モバイル（768px未満）：記事下部縦並び、最近の投稿3件表示

#### ブログ関連コンポーネント

```typescript
components/Blog/
  ├── ArticleCard.astro   // 記事プレビューカード
  ├── ArticleHeader.astro // 記事ヘッダー
  ├── ArticleMeta.astro   // 記事メタ情報
  ├── TOC.astro          // 目次
  └── SeriesNav.astro    // シリーズナビゲーション
```

実装詳細：

- ヒーロー画像の最適化表示機能
- 記事メタ情報の表示
  - カテゴリー表示
  - タグ一覧
  - 公開日/更新日
  - 読了時間の計算と表示
- シリーズ記事のナビゲーション
  - 前後の記事リンク
  - シリーズ内の位置表示
  - シリーズ概要
- 目次の自動生成機能
- 関連記事の表示ロジック

### ページ構造設計

#### トップページ (`/src/pages/index.astro`)

実装要件：

- 最新記事のグリッド表示
  - レスポンシブな配置
  - 記事カードのホバーエフェクト
- カテゴリーフィルター機能
  - カテゴリー別の記事一覧
  - フィルター状態の URL 対応
- ページネーション実装
  - 1ページあたりの表示件数制御
  - ページ遷移のアニメーション
- 人気記事セクション
  - アクセス数に基づく表示
  - キャッシュ戦略

#### 記事ページ (`/src/pages/blog/[slug].astro`)

実装要件：

- ヒーロー画像の表示
  - 画像の最適化
  - ロード時のプレースホルダー
- 記事ヘッダー構成
  - タイトル表示
  - メタ情報の配置
- 目次の実装
  - 見出しの自動抽出
  - スムーズスクロール
- 本文表示
  - Markdownのレンダリング
  - シンタックスハイライト
- シリーズナビゲーション
  - 前後の記事リンク
  - 進捗表示
- 関連記事の表示
  - タグベースの関連記事抽出
  - カテゴリーベースの提案
- 著者プロフィール
  - プロフィール画像
  - 経歴情報
  - SNSリンク

#### 静的ページ群

- アバウトページ
  - サイト概要
  - 運営方針
- プロフィールページ
  - 詳細プロフィール
  - 活動履歴
- プライバシーポリシー
  - 利用規約
  - プライバシー方針

### 開発優先順位

1. 基盤コンポーネントの開発
   - Layout.astro
     - サイトの基本構造定義
     - ダークモード対応基盤
     - ViewTransitions実装
   - BaseHead.astro
     - メタ情報管理
     - SEO対応基盤
     - スタイルシート管理

2. 骨格コンポーネントの実装
   - Header/Header.astro
     - ナビゲーション構造
     - レスポンシブ対応
   - Footer/Footer.astro
     - 基本情報表示
     - リンク管理
   - Sidebar/Sidebar.astro
     - サイドバー構造
     - レスポンシブ対応

3. 機能コンポーネントの開発
   - Header/ThemeToggle.astro
     - ダークモード切替
     - 設定保存機能
   - Header/Navigation.astro
     - メインナビゲーション
     - モバイル対応
   - Blog/ArticleCard.astro
     - 記事一覧表示
     - プレビュー機能

4. 追加機能の実装
   - TOC
     - 目次生成
     - ナビゲーション
   - シリーズナビゲーション
     - 記事間リンク
     - 進捗表示
   - 検索機能
     - インデックス作成
     - 検索UI

## 2. テーマと設計仕様

### テーマ実装

#### ダークモード実装

実装要件：

- システム設定の検出機能
  - prefers-color-scheme の監視
  - 初期値の設定
- 手動切替の実装
  - トグルボタンの UI
  - 状態管理
- 設定の永続化
  - LocalStorage での保存
  - 設定の復元
- 切替アニメーション
  - スムーズな遷移
  - ちらつき防止

#### レスポンシブ設計

```typescript
// ブレークポイント定義
const breakpoints = {
  sm: '640px',   // スマートフォン
  md: '768px',   // タブレット
  lg: '1024px',  // ノートPC
  xl: '1280px',  // デスクトップ
  '2xl': '1536px'// 大画面
}
```

レスポンシブ対応方針：

- モバイルファースト
- 段階的な表示調整
- コンテンツの優先順位付け

### コンテンツ管理システム

#### 記事スキーマ設計

```typescript
interface Article {
  title: string;          // 記事タイトル
  description: string;    // 記事説明
  pubDate: Date;         // 公開日
  updatedDate: Date;     // 更新日
  heroImage: string;     // ヒーロー画像パス
  headline: string;      // 見出し
  category: string;      // カテゴリー
  tags: string[];        // タグ
  series?: {             // シリーズ情報（オプション）
    name: string;
    index: number;
  };
  draft: boolean;        // 下書きフラグ
  readingTime: number;   // 読了時間
}
```

#### コンテンツコレクション構成

```typescript
src/
├── content/
│   ├── config.ts        # スキーマ定義
│   └── blog/
│       ├── post-1.md    # ブログ記事
│       └── post-2.md
└── data/
    └── categories.ts    # カテゴリー定義
```

##### スキーマ定義

スキーマ定義は、Astroのコンテンツ（主にマークダウンやMDXファイル）のフロントマターを検証するための設計図として機能します。

**主な役割：**

- フロントマターの型安全性を確保
- 必須フィールドと任意フィールドの指定
- データの検証とバリデーション
- 入力データの変換（例：文字列の日付をDateオブジェクトに変換）

zodを使用してスキーマを定義することで：

- ビルド時に型チェック
- ランタイムでのデータ検証
- TypeScriptの型推論による開発時のサポート

が得られます。

**実際の使用例：**

```typescript
// マークダウンファイルのフロントマター
---
title: "記事タイトル"
pubDate: "2024-01-01"
---

// このフロントマターが、スキーマに従って検証される
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date()
  })
})
```

スキーマ定義は、コンテンツとプログラムコードの橋渡しの役割を果たしています。

#### ユーティリティ関数群 (`/src/utils/collections.ts`)

記事コレクションの管理と公開制御を行うユーティリティ関数を提供します。これらの関数は、開発環境と本番環境で異なる動作を実装し、適切な記事の表示制御を行います。

主な機能：

公開記事の取得：

- 開発環境ではすべての記事を表示し、開発とテストを容易にします。
- 本番環境では以下の条件で記事をフィルタリングします：
  - 下書き（draft: true）の記事を除外
  - 公開日が現在日時より未来の記事を除外

記事の型安全性：

- BlogPost型による記事データの構造定義
- Astroのコレクション型との連携による型安全性の確保
- 必須フィールド（タイトル、公開日、タグ、カテゴリー）の型チェック

これらの機能により、開発時の柔軟性を確保しつつ、本番環境での確実な記事公開管理を実現します。

## 3. SEOとパフォーマンス最適化

### SEO実装

#### メタデータ設計

基本情報：

- タイトル設計
- 説明文最適化
- 公開日/更新日管理
- カノニカルURL設定
- サイト情報構造化

技術記事拡張：

- プログラミング言語情報
- 技術カテゴリ分類
- シリーズ情報構造化

#### 構造化データ実装

```typescript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://aqz-tech.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Category",
      "item": "https://aqz-tech.com/category/name"
    }
  ]
}
```

シリーズ記事の構造化：

```typescript
const seriesSchema = {
  "@context": "https://schema.org",
  "@type": "Series",
  "name": "シリーズ名",
  "position": "記事位置",
  "url": "シリーズURL",
  "partOfSeries": {
    "@type": "Series",
    "name": "シリーズ全体名"
  }
}
```

### パフォーマンス最適化

#### 画像最適化戦略

- Astro画像最適化機能の活用
  - 自動サイズ調整
  - フォーマット変換
- WebP形式の使用
  - 互換性対応
  - フォールバック設定
- 遅延読み込み実装
  - Intersection Observer活用
  - プレースホルダー表示
- レスポンシブ画像生成
  - srcset属性の活用
  - サイズ最適化

#### アセット最適化

- TailwindCSS最適化
  - 未使用クラスの除去
  - ビルド時最適化
- CSS Modules活用
  - スコープ付きCSS
  - 命名衝突防止
- JavaScript最適化
  - コード分割
  - 遅延読み込み
- リソース配信
  - CDN活用
  - キャッシュ戦略

## 4. インフラストラクチャと自動化

### GitHub Actions設定

#### ビルドプロセス

- コード検証
- 型チェック
- ビルド実行
- テスト実行

#### コンテンツ処理

- 画像最適化
  - サイズ調整
  - フォーマット変換
- コンテンツ検証
  - リンクチェック
  - フォーマット確認

#### デプロイメント

- Cloudflare Pages連携
  - ビルド設定
  - 環境変数管理
- キャッシュ制御
  - キャッシュ期間設定
  - 更新戦略

#### 分析システム

#### Google Analytics 4

- 基本設定
  - トラッキングコード
  - イベント設定
- プライバシー対応
  - クッキー同意
  - データ収集制御
- パフォーマンス計測
  - Core Web Vitals
  - ユーザー行動分析

#### カスタム分析

- アクセス解析
  - PV/UU計測
  - 滞在時間分析
- コンテンツ分析
  - 人気記事把握
  - 検索キーワード分析
- パフォーマンスモニタリング
  - 読み込み速度
  - エラー監視

#### アクセシビリティ対応

#### キーボードナビゲーション

- フォーカス管理
- ショートカットキー

#### スクリーンリーダー

- ARIA属性設定
- 代替テキスト管理

#### 視覚的アクセシビリティ

- カラーユニバーサルデザイン
- ダークモード対応
- テキストのリーダビリティ確保

### サイト設定管理

#### 基本設定 (`/src/config/site.config.ts`)

```typescript
interface SiteConfig {
  name: string;          // サイトの正式名称
  title: string;         // SEO対応タイトル
  description: string;   // サイト説明
  image: string;         // サイト画像
  ogImage: string;       // OGP画像
  lang: string;          // 言語設定
  locale: string;        // ロケール設定
  themeColor: string;    // テーマカラー
}
```

#### 設定値の制約

実装要件：

- name: サイトの正式名称としての使用
- title: SEOを考慮した完全なタイトル
- description: 検索結果表示用の説明文
- image, ogImage: 絶対パスまたは相対パス
- lang, locale: 国際化対応の言語設定
- themeColor: カラーテーマの基準色

#### コンテンツ設定

- 記事表示設定
  - 1ページあたりの表示件数
  - 抜粋文字数
  - 日付フォーマット
- カテゴリー設定
  - 表示順序
  - 親子関係
- タグ設定
  - 表示制限
  - 並び順

## 開発ガイドライン

### コンポーネント開発方針

#### 基本原則

- コンポーネントベースの開発
- TypeScriptによる型安全性の確保
- 命名規則の統一
- ドキュメント作成要件

#### コンポーネント構造

```typescript
src/
  ├── components/   // 共通コンポーネント
  ├── layouts/      // レイアウトコンポーネント
  ├── pages/        // ページコンポーネント
  └── utils/        // ユーティリティ
```

### 拡張性への考慮

#### 新機能追加

- コンポーネントの独立性確保
- インターフェースの一貫性
- 設定の集中管理

#### 保守性

- コードの可読性維持
- 依存関係の明確化
- エラーハンドリング

## 6. 開発環境仕様

### 開発環境構成

#### パッケージ管理

開発環境全体でpnpmをパッケージマネージャーとして採用します。pnpmは高速なインストール、ディスク容量の効率的な使用、および厳密な依存関係管理を提供します。

#### コード品質管理

コードの一貫性と品質を確保するため、以下のツールを導入します：

ESLintの構成：

- TypeScript対応の設定
- Astro固有のルール適用
- コーディング規約の自動チェック

Prettierの設定：

- 一貫したコードフォーマット
- エディタ統合による自動整形
- コミット前の自動チェック

Markdownlintの実装：

- 技術文書の品質管理
- フロントマターの検証
- リンクの有効性確認

### ビルドシステム

#### バンドラー構成

プロジェクトの異なる部分に対して、適切なビルドツールを使用します：

Viteの活用（Astroメインサイト）：

- 高速な開発サーバー
- 効率的なビルド処理
- HMRの最適化

Astro標準ビルドツール（検索機能）：

- 検索インデックスの生成
- 最適化された検索機能のビルド
- 静的アセットの処理

#### アセット最適化プロセス

画像とスタイルの最適化を自動化します：

Astro画像最適化：

- 自動的なサイズ最適化
- フォーマット変換の自動化
- レスポンシブ画像の生成

TailwindCSSの最適化：

- Purge機能による未使用クラスの除去
- CSSバンドルの最小化
- 開発時のスタイル補完

### 型システム

#### コンテンツ型安全性

Astro Content Collectionsを活用した堅牢な型システムを実装します：

フロントマターの型定義：

- 記事メタデータの型チェック
- 必須フィールドの検証
- カスタムバリデーション

共通型定義の管理：

- プロジェクト間で共有される型定義
- インターフェースの一貫性確保
- 型の再利用性の向上

## 7. 検索機能

```typescript
aqz-tech.com/
├── src/
│   ├── content/
│   │   └── blog/
│   │       └── [your blog posts].md
│   └── utils/
│       └── collections.ts
├── scripts/
│   └── generate-search-index.ts
└── package.json
```

package.json:

```typescript
  "scripts": {
    "build:search": "NODE_ENV=production node --loader ts-node/esm --no-warnings scripts/generate-search-index.ts",
    "build": "pnpm run build:search && astro check && astro build",
  },
```
