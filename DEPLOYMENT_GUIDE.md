# 🚀 波爾多樂菲莊園 - 電子投票系統部署指南

## 📖 系統簡介

這是一個基於 Vue.js + Supabase 的社區管理系統，包含完整的電子投票功能。系統支援：
- 匿名投票機制
- 即時結果統計
- 多種數據視覺化
- 響應式設計
- 安全的權限控制

## 🛠 技術棧

- **前端**: Vue 3 + Vue Router + Vuex
- **後端**: Supabase (PostgreSQL + Realtime)
- **樣式**: Bootstrap + 自定義 CSS
- **構建工具**: Vite

## 📦 快速開始

### 步驟 1: Clone 專案

```bash
git clone https://github.com/your-username/bordeaux-ii.git
cd bordeaux-ii
```

### 步驟 2: 安裝依賴

```bash
npm install
```

### 步驟 3: 創建 Supabase 專案

1. 前往 [Supabase Dashboard](https://app.supabase.com/)
2. 點擊 "New Project"
3. 選擇組織並填寫專案資訊：
   - **Name**: bordeaux-voting-system (或你偏好的名稱)
   - **Database Password**: 設置一個強密碼
   - **Region**: 選擇離你最近的區域
4. 等待專案創建完成（約 2-3 分鐘）

### 步驟 4: 獲取 Supabase 配置資訊

專案創建完成後：

1. 進入專案 Dashboard
2. 點擊左側選單的 "Settings" → "API"
3. 複製以下資訊：
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **API Key (anon public)**: `eyJhbGciOiJIUzI1NiIsInR5cCI6...`

### 步驟 5: 設置環境變數

在專案根目錄創建 `.env.local` 文件：

```bash
# 創建環境變數文件
touch .env.local
```

將以下內容填入 `.env.local`：

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 注意事項：
# 1. 將 your-project-ref 替換為你的實際專案 ID
# 2. 將 your-anon-key-here 替換為你的實際 API Key
# 3. 絕對不要將此文件提交到 Git 版本控制中
```

### 步驟 6: 設置資料庫

#### 6.1 創建資料表結構

1. 在 Supabase Dashboard 中，點擊左側的 "SQL Editor"
2. 點擊 "New Query"
3. 複製 `src/data/voting_schema.sql` 的全部內容並貼上
4. 點擊 "Run" 執行腳本

#### 6.2 插入示例資料（可選）

1. 在 SQL Editor 中創建新查詢
2. 複製 `src/data/sample_voting_data.sql` 的全部內容並貼上
3. 點擊 "Run" 執行腳本

### 步驟 7: 啟動開發服務器

```bash
npm run dev
```

瀏覽器會自動開啟 `http://localhost:5173`

### 步驟 8: 測試系統

1. 訪問導航欄的 "🗳 電子投票" 選項
2. 查看示例投票（如果你執行了步驟 6.2）
3. 測試投票功能

## 🔧 詳細配置說明

### Supabase 表格說明

| 表格名稱 | 描述 | 用途 |
|---------|------|------|
| `voting_topics` | 投票主題 | 存儲投票活動基本資訊 |
| `voting_options` | 投票選項 | 每個投票的可選項目 |
| `voting_records` | 投票記錄 | 用戶投票行為記錄 |
| `voting_results` | 投票結果 | 統計後的投票結果 |
| `voting_notifications` | 通知記錄 | 投票相關通知歷史 |

### 權限設置 (RLS)

系統已自動配置以下權限：

- **查看權限**: 所有人可查看投票主題、選項和結果
- **投票權限**: 需要認證才能投票
- **隱私保護**: 用戶只能查看自己的投票記錄

### 環境變數說明

| 變數名稱 | 描述 | 必填 |
|---------|------|------|
| `VITE_SUPABASE_URL` | Supabase 專案 URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase 匿名 API Key | ✅ |

## 🚀 生產部署

### Vercel 部署

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 點擊 "New Project"
3. 導入你的 GitHub 倉庫
4. 在 "Environment Variables" 中設置：
   ```
   VITE_SUPABASE_URL=你的Supabase URL
   VITE_SUPABASE_ANON_KEY=你的Supabase API Key
   ```
5. 點擊 "Deploy"

### Netlify 部署

1. 前往 [Netlify Dashboard](https://app.netlify.com/)
2. 點擊 "New site from Git"
3. 選擇你的倉庫
4. 在 "Environment variables" 中設置相同的環境變數
5. Build command: `npm run build`
6. Publish directory: `dist`
7. 點擊 "Deploy site"

## 🎯 自定義配置

### 添加新的投票

在 Supabase SQL Editor 中執行：

```sql
-- 插入新投票主題
INSERT INTO voting_topics (
  title, 
  description, 
  start_date, 
  end_date, 
  voting_type, 
  target_audience, 
  purpose
) VALUES (
  '你的投票標題',
  '投票描述',
  '2025-12-01 00:00:00+00',
  '2025-12-07 23:59:59+00',
  'single',
  '目標投票群體',
  '投票目的'
);

-- 插入投票選項 (需要先獲取上面插入的 topic_id)
INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index)
VALUES 
  ('topic-id-here', '選項 1', 'option1', '選項 1 的描述', 1),
  ('topic-id-here', '選項 2', 'option2', '選項 2 的描述', 2);
```

### 修改樣式主題

主要樣式文件位置：
- `src/components/VotingList.vue` - 投票列表頁樣式
- `src/components/VotingDetail.vue` - 投票詳情頁樣式  
- `src/components/VotingChart.vue` - 圖表組件樣式

## 🐛 常見問題

### Q1: 無法連接到 Supabase

**解決方案:**
1. 檢查 `.env.local` 文件是否存在且配置正確
2. 確認 Supabase 專案狀態正常
3. 檢查 API Key 是否正確複製

### Q2: 投票功能無法使用

**解決方案:**
1. 確認資料表是否正確創建：
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name LIKE 'voting%';
   ```
2. 檢查 RLS 政策是否啟用
3. 確認用戶認證狀態

### Q3: 開發服務器啟動失敗

**解決方案:**
```bash
# 清除 node_modules 和重新安裝
rm -rf node_modules package-lock.json
npm install

# 檢查 Node.js 版本 (建議 16+)
node --version

# 使用 yarn 替代 npm (可選)
yarn install && yarn dev
```

### Q4: 生產環境白屏

**解決方案:**
1. 檢查建構日誌中的錯誤訊息
2. 確認環境變數在部署平台中正確設置
3. 檢查 `vue.config.js` 中的 `publicPath` 設置

## 📞 技術支援

### 文件資源
- [Vue.js 官方文檔](https://vuejs.org/)
- [Supabase 官方文檔](https://supabase.com/docs)
- [Vite 官方文檔](https://vitejs.dev/)

### 日誌調試

啟用詳細日誌：
```javascript
// 在 src/utils/supabase.js 中添加
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('API Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### 資料庫查詢測試

在 Supabase SQL Editor 中測試：
```sql
-- 檢查投票資料
SELECT * FROM voting_topics LIMIT 5;
SELECT * FROM voting_options LIMIT 10;
SELECT * FROM voting_records LIMIT 10;
```

## 🔄 系統更新

保持系統最新：
```bash
# 拉取最新代碼
git pull origin main

# 更新依賴
npm update

# 重新啟動服務
npm run dev
```

---

🎉 **恭喜！** 你已成功部署波爾多樂菲莊園電子投票系統！

如果遇到任何問題，歡迎創建 Issue 或聯繫維護團隊。