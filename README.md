# メールマガジン登録フォーム (testmailform)

メールマガジンの購読登録フォームを提供するシングルページアプリケーションです。
React + TypeScript + Vite + Tailwind CSS をベースに、Supabase と Mailchimp 連携を実装しています。

---

## 🔍 特徴

- **React & TypeScript** で型安全に開発
- **Vite** による高速な起動とビルド
- **Tailwind CSS** でレスポンシブ対応のスタイリング
- **Framer Motion** で入力フォームやサクセスメッセージにアニメーション
- **Supabase** への購読者情報保存
- **Mailchimp** の Edge Function 経由で購読登録
- **Zustand** でフォーム状態を管理

---

## 🚀 動作環境

- Node.js v14 以上
- npm または Yarn
- Supabase プロジェクト
- Mailchimp アカウント（リスト ID）

---

## ⚙️ 環境変数

プロジェクトルートに `.env` ファイルを作成し、以下を設定してください（`.env.example` を参照）。

```bash
VITE_SUPABASE_URL=あなたのSupabaseプロジェクトURL
VITE_SUPABASE_ANON_KEY=あなたのSupabase匿名キー
VITE_SUPABASE_SUBSCRIBERS_TABLE=subscribers  # デフォルト: subscribers
VITE_MAILCHIMP_FUNCTION_NAME=subscribe-to-mailchimp  # デフォルト: subscribe-to-mailchimp
VITE_APP_TITLE=メールマガジン登録
VITE_APP_DESCRIPTION=最新情報をお届けするメールマガジンへの登録ページです。
```

> ※ `.gitignore` にすでに `.env` が設定されているため、Gitには公開されません。

---

## 📦 インストール & 開発サーバ起動

```bash
# リポジトリをクローン
git clone https://github.com/masatoshikudo/testmailform.git
cd testmailform

# 依存関係をインストール
npm install  # または yarn install

# 開発サーバ起動
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスして動作を確認できます。

---

## ⚒️ ビルド & プレビュー

```bash
# ビルド
npm run build

# ビルドファイルをプレビュー
npm run preview
```

---

## 📂 ディレクトリ構成

```
project_mailform/
├── .env.example       # 環境変数サンプル
├── public             # 静的アセット
├── src
│   ├── App.tsx        # ルートコンポーネント
│   ├── main.tsx       # エントリポイント
│   ├── components/    # UIコンポーネント
│   ├── lib/           # Supabase / Mailchimp連携ロジック
│   ├── store/         # Zustandフォームストア
│   └── types/         # TypeScript 型定義
├── supabase/
│   └── functions/     # Supabase Edge Functions (Mailchimp)
├── tailwind.config.js
├── tsconfig.json      # TypeScript設定
├── vite.config.ts     # Vite設定
└── README.md          # このファイル
```

---

## 📝 ライセンス

MIT License

---

## ✒️ 作者

- masatoshikudo (https://github.com/masatoshikudo)

---

Happy Coding! 🎉