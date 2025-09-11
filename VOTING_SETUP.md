# 🗳 電子投票系統設置指南

## 📋 系統概述

電子投票系統已成功整合到波爾多樂菲莊園社區管理平台中，提供完整的投票管理功能：

- **投票列表頁面** - 顯示所有投票活動
- **投票詳情頁面** - 投票介面和結果展示  
- **即時數據同步** - 使用 Supabase 實現即時更新
- **響應式設計** - 支援手機和桌機使用
- **安全投票** - 匿名投票機制，防止重複投票

## 🚀 部署步驟

### 1. Supabase 資料庫設置

1. **執行資料表創建腳本**
   ```sql
   -- 在 Supabase SQL Editor 中執行
   -- 檔案位置: src/data/voting_schema.sql
   ```

2. **插入示例資料**
   ```sql
   -- 在 Supabase SQL Editor 中執行
   -- 檔案位置: src/data/sample_voting_data.sql
   ```

3. **設定 Row Level Security (RLS)**
   - 投票主題和選項：允許所有人查看
   - 投票記錄：只允許認證用戶投票，只能查看自己的投票
   - 投票結果：允許所有人查看

### 2. 環境變數設置

1. **本地開發環境**
   - 檔案 `.env.local` 已創建並包含 Supabase 配置
   - ⚠️ **重要**：此檔案已在 `.gitignore` 中，不會被提交到 Git

2. **生產環境部署**
   在部署平台（Vercel/Netlify 等）設定以下環境變數：
   ```
   VITE_SUPABASE_URL=https://ehhtjoxwwmnsklhnkqnk.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoaHRqb3h3d21uc2tsaG5rcW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTY5MjksImV4cCI6MjA3MzE3MjkyOX0.If6HZjrJS7HmrT8EaP_N_nCw-FANVeyIzW5qGxAlFlI
   ```

### 3. 應用程式更新

✅ 以下功能已完成：

- **路由配置** - 新增投票相關路由
- **導航選單** - 加入「🗳 電子投票」選項
- **組件整合** - 所有投票組件已創建並整合

## 📱 功能特色

### 投票管理
- **多狀態投票**：即將開始、進行中、已結束
- **投票類型**：單選投票（可擴展為多選）
- **附件支援**：可上傳相關文件（PDF、圖片等）
- **時間控制**：自動狀態更新（基於開始/結束時間）

### 數據視覺化
- **長條圖**：投票結果對比
- **圓餅圖**：比例分布展示
- **熱力圖**：樓層投票分布
- **統計儀表板**：參與率、總投票數等

### 用戶體驗
- **即時更新**：使用 Supabase Realtime
- **投票確認**：防止誤投的二次確認機制
- **投票狀態**：清楚顯示用戶是否已投票
- **響應式設計**：適配各種螢幕尺寸

## 🔧 技術架構

```
Frontend (Vue 3)
├── VotingList.vue       # 投票列表頁
├── VotingDetail.vue     # 投票詳情頁  
├── VotingChart.vue      # 數據視覺化
└── utils/supabase.js    # API 工具函數

Backend (Supabase)
├── voting_topics        # 投票主題表
├── voting_options       # 投票選項表
├── voting_records       # 投票記錄表
├── voting_results       # 投票結果表
└── voting_notifications # 通知記錄表
```

## 🔐 安全考慮

1. **API Key 保護**
   - 使用環境變數存儲敏感資訊
   - 生產環境中絕不在代碼中硬編碼 API Key

2. **投票完整性**
   - 每個用戶每個投票只能投一次（資料庫約束）
   - 匿名投票但記錄基本統計資訊

3. **資料權限**
   - 使用 Supabase RLS 控制資料存取
   - 投票結果透明，但投票記錄私密

## 📞 使用說明

### 管理員操作
1. 在 Supabase 後台創建新的投票主題
2. 設定投票選項和時間範圍
3. 投票自動根據時間切換狀態

### 住戶操作  
1. 訪問「電子投票」頁面
2. 查看當前和歷史投票
3. 點擊投票進入詳情頁面投票
4. 查看即時投票結果

## 🎯 示例投票

系統已預載入三個示例投票：

1. **🏡 社區管理費調整方案表決**（進行中）
   - 三個管理費選項：70元、80元、90元
   - 展示完整投票流程

2. **🌕 2025年中秋節社區活動規劃**（已結束）  
   - 展示投票結果和數據視覺化
   - 包含樓層分布統計

3. **🎄 聖誕節社區佈置主題票選**（即將開始）
   - 展示預告投票功能

## 🚨 注意事項

- 確保 Supabase 專案已啟用 Realtime 功能
- 定期備份投票資料
- 在正式投票前進行完整測試
- 考慮為重要投票設置人工審核機制

---

📧 如有技術問題，請聯繫系統管理員
🔄 系統將持續更新和優化