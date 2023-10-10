# MagicalParticles

「マジカルミライ 2023」楽曲コンテンストの受賞作品を楽しむことができるリリックアプリです。

以下の楽曲に対応しています。

- ネオンライトの海を往く / Ponchi♪ feat. 初音ミク

ネオンライトの海をイメージしたパーティクルによる演出をぜひお楽しみください。  
（カーソルの移動やクリックにも反応します！）

- サンプルコードのデモページ: https://mm-app-2023.pages.dev/

![スクリーンショット 2023-07-18 10 49 22](https://github.com/kshida/mm-app-2023/assets/34312716/c4ada3bc-f710-42fe-92e4-f5e5325c392c)


## 開発

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行すると、開発用サーバが起動します。

```sh
npm install
npm run dev
```

ローカルではTextAlive用のトークンを環境変数から取得しています。
```
            app: {
                token: import.meta.env.VITE_TEXT_ALIVE_TOKEN
            },
```

事前に `.env.local` を作成し、以下内容を追記してください。
```
VITE_TEXT_ALIVE_TOKEN={トークン}
```

## ビルド

以下のコマンドで `dist` 以下にビルド済みファイルが生成されます。

```sh
npm run build
```

## 使用技術
本アプリは以下を利用しています。
 - [Vite](https://vitejs.dev/)
 - [React](https://react.dev/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [react-particles](https://github.com/tsparticles/react)
 - [TextAlive App API](https://github.com/TextAliveJp/textalive-app-basic)

### TextAlive App API

![TextAlive](https://i.gyazo.com/thumb/1000/5301e6f642d255c5cfff98e049b6d1f3-png.png)

本アプリはTextAlive App APIを使用したリリックアプリです。

TextAlive App API について詳しくはWebサイト [TextAlive for Developers](https://developer.textalive.jp/) をご覧ください。

---
https://github.com/TextAliveJp/textalive-app-basic
