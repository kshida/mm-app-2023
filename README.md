# mm-app-2023

初音ミク「マジカルミライ 2023」 プログラミング・コンテスト応募用のリリックアプリです。

ネオンライトの海をイメージしたパーティクルによる演出をぜひお楽しみください。

- サンプルコードのデモページ: https://mm-app-2023.pages.dev/

## 開発

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行すると、開発用サーバが起動します。

```sh
npm install
npm run dev
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