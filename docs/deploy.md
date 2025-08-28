# 🚀 發佈流程 (Deploy Guide)

本專案透過 **GitHub Pages (gh-pages 分支)** 部署靜態網站。  
原始碼維護在 `main`，編譯後的檔案放到 `gh-pages`。

---

## 1. 在 main 分支 build

```bash
git checkout main
npm install    # 第一次才需要
npm run build  # 產生 dist/
```

## 2. 複製 dist 到 gh-pages

因為 gh-pages 分支已經被 checkout 到 gh-pages-build 資料夾，
所以直接把 build 結果複製過去即可

```bash
cp -r dist/* ../gh-pages-build/
```

## 3. Commit & Push

進入 gh-pages-build 目錄，提交更新：

```bashcd ../gh-pages-build
git add .
git commit -m "Deploy updated site"
git push origin gh-pages
```

## 4. 驗證

等候約 1~3 分鐘

確認網站是否成功更新
👉 https://joechiboo.github.io/bordeaux-ii/