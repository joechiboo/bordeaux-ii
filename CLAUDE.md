# Bordeaux II 社區網站 - Claude 助手說明

## 項目概述
這是一個為「波爾多-樂菲莊園」社區開發的 Vue.js 網站，提供社區資訊、委員名單、公共設施資訊等功能。

## 技術架構
- **框架**: Vue 3
- **構建工具**: Vue CLI + Vite
- **UI 框架**: Bootstrap 5
- **圖標**: Font Awesome 6
- **路由**: Vue Router
- **狀態管理**: Vuex

## 部署流程 (重要！)

### 當前部署方式
由 **GitHub Actions 自動部署**（`.github/workflows/deploy.yml`）。任何 push 到 `main` 的 commit 會自動觸發 build 並以 `force_orphan` 方式 push 到 `gh-pages` 分支。**不要手動 build 或手動 push gh-pages**，會被下一次 Actions 覆蓋。

### 標準流程
1. 在 `main`（或 feature branch）修改程式碼
2. Commit 並 push；若走 feature branch，用 `gh pr create` 開 PR merge 回 main
3. Merge 後等 Actions 完成（約 1~2 分鐘），網站即更新

### 本地 `gh-pages-build/` worktree
- 仍是 `gh-pages` 分支的 worktree，保留供檢視產物用
- 由於 Actions 使用 `force_orphan: true`，每次部署會孤兒化 gh-pages，本地 worktree 必要時用 `git fetch origin gh-pages && git -C gh-pages-build reset --hard origin/gh-pages` 同步

### 網站地址
https://joechiboo.github.io/bordeaux-ii/

## 開發環境設置

### 安裝依賴
```bash
npm install
```

### 開發服務器
```bash
npm run dev
# 或
npm run serve
```

### 構建生產版本
```bash
npm run build
```

### Lint 檢查
```bash
npm run lint
```

## 項目結構
```
src/
├── components/          # Vue 組件
│   ├── AppNavbar.vue   # 導航欄
│   ├── WelcomeBanner.vue # 首頁歡迎
│   ├── CommitteeMembers.vue # 委員名單
│   ├── CommunityFacilities.vue # 公共設施
│   └── ...
├── data/               # 數據文件
│   ├── facilitiesData.js # 設施數據
│   ├── committeeData.js # 委員數據
│   └── ...
├── router/             # 路由配置
├── store/              # Vuex 狀態管理
└── utils/              # 工具函數
```

## 重要配置文件
- `vite.config.js` - Vite 配置，包含路徑別名 `@` -> `src`
- `vue.config.js` - Vue CLI 配置，生產環境 publicPath 設為 `/bordeaux-ii/`
- `package.json` - 依賴和腳本配置

## 開發提醒

### 路徑別名
- 使用 `@/` 作為 `src/` 的別名
- 例：`import { data } from '@/data/file.js'`

### 樣式框架
- 主要使用 Bootstrap 5 的 class
- Font Awesome 6 提供圖標
- 自定義 CSS 使用 scoped 樣式

### 導航配置
- 導航按鈕在 `AppNavbar.vue` 中配置
- 路由在 `src/router/index.js` 中定義
- 記得同步更新導航和路由配置

## 常見問題

### 1. 網站更新沒有生效
確保按照部署流程執行完整步驟，特別是推送到 gh-pages 分支。

### 2. 路徑解析錯誤
檢查 `vite.config.js` 中的路徑別名配置是否正確。

### 3. 樣式載入問題
確保在 `main.js` 中正確引入了 Bootstrap CSS 和 JS。

## 聯繫資訊
- GitHub Repository: https://github.com/joechiboo/bordeaux-ii
- GitHub Pages: https://joechiboo.github.io/bordeaux-ii/