# 🚀 發佈流程 (Deploy Guide)

本專案透過 **GitHub Actions** 自動部署到 GitHub Pages。

---

## 🤖 自動部署 (推薦)

### 設定完成後的流程

1. **推送代碼到 main 分支**：
   ```bash
   git add .
   git commit -m "更新內容"
   git push origin main
   ```

2. **GitHub Actions 自動執行**：
   - 安裝依賴
   - 構建專案 (`npm run build`)
   - 部署到 gh-pages 分支
   - 約 2-5 分鐘完成

3. **查看部署狀態**：
   - Actions 頁面：https://github.com/joechiboo/bordeaux-ii/actions
   - 網站地址：https://joechiboo.github.io/bordeaux-ii/

### GitHub Secrets 設定

⚠️ **一次性設定 - 已完成**

前往：`https://github.com/joechiboo/bordeaux-ii/settings/secrets/actions`

必要的 Secrets：
- `VUE_APP_SUPABASE_URL` = `https://ehhtjoxwwmnsklhnkqnk.supabase.co`
- `VUE_APP_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (完整金鑰)

---

## 🏷️ 版號更新

版號格式：`年.月.日.時.分`（例如 `25.12.19.08.33`）

**只需修改一處**：`package.json` 的 `version` 欄位

```json
{
  "version": "25.12.19.08.33"
}
```

選單會自動從 `package.json` 讀取版號顯示。

---

## 📋 手動部署 (備用方案)

如果 GitHub Actions 失效，可使用手動方式：

### 1. 在 main 分支 build

```bash
git checkout main
npm install    # 第一次才需要
npm run build  # 產生 dist/
```

### 2. 複製 dist 到 gh-pages

因為 gh-pages 分支已經被 checkout 到 gh-pages-build 資料夾：

```bash
cp -r dist/* gh-pages-build/
```

### 3. Commit & Push

進入 gh-pages-build 目錄，提交更新：

```bash
cd gh-pages-build
git add .
git commit -m "Deploy updated site"
git push origin gh-pages
```

---

## 🔧 環境變數配置

### 本地開發

`.env` 檔案（已設定，不要推送到 GitHub）：
```env
VUE_APP_SUPABASE_URL=https://ehhtjoxwwmnsklhnkqnk.supabase.co
VUE_APP_SUPABASE_ANON_KEY=eyJhbGci... (完整金鑰)

VITE_SUPABASE_URL=https://ehhtjoxwwmnsklhnkqnk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci... (完整金鑰)
```

### 生產環境

通過 GitHub Secrets 注入到構建過程，確保安全性。

---

## 🐛 故障排除

### GitHub Actions 失敗

1. **檢查 Actions 日誌**：https://github.com/joechiboo/bordeaux-ii/actions
2. **確認 Secrets 設定正確**
3. **檢查構建錯誤**（通常是依賴問題）

### 網站無法載入

1. **確認 Supabase 連線**：檢查瀏覽器 Console
2. **清除瀏覽器快取**
3. **等待 GitHub Pages 更新**（最多 10 分鐘）

### 環境變數問題

確認 `src/utils/supabase.js` 中的環境變數讀取：
- 開發環境：`import.meta.env.VITE_*` (Vite)
- 生產環境：`process.env.VUE_APP_*` (Vue CLI)

---

## 📊 部署歷史

- **2025-12-19**: 版號自動從 package.json 讀取
- **2024-09-12**: 設定 GitHub Actions 自動部署
- **2024-08**: 初始手動部署流程