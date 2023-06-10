#!/usr/bin/env sh
echo 'コンテナ起動時の処理開始'

echo 'npmパッケージインストール'
yarn install

echo 'キャッシュクリア'
yarn cache clean

echo 'コンテナ起動時の処理終了'