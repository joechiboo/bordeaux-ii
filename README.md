# 🏠 波爾多樂菲莊園 - 社區管理系統

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

一個現代化的社區管理平台，包含完整的電子投票系統，幫助社區住戶參與社區事務決策。

## ✨ 主要功能

### 🗳️ 電子投票系統
- **多狀態投票管理** - 即將開始、進行中、已結束
- **匿名安全投票** - 保護用戶隱私，防止重複投票  
- **即時結果統計** - 實時更新投票進度和結果
- **數據視覺化** - 長條圖、圓餅圖、熱力圖展示
- **樓層分布統計** - 了解各樓層投票傾向

### 🏘️ 社區管理功能
- **會議記錄管理** - 住戶登入後可查看會議紀錄
- **委員會資訊** - 管委會成員介紹和聯絡方式
- **社區規章** - 完整的社區管理規範
- **公共設施** - 設施使用預約和管理
- **大事記** - 社區重要事件記錄

## 🚀 快速開始

### 環境要求
- Node.js 16.0+
- npm 或 yarn
- Supabase 帳戶

### 安裝步驟

```bash
# 1. 克隆專案
git clone https://github.com/your-username/bordeaux-ii.git
cd bordeaux-ii

# 2. 安裝依賴
npm install

# 3. 設置環境變數
cp .env.example .env.local
# 編輯 .env.local 填入你的 Supabase 配置

# 4. 啟動開發服務器
npm run dev
```

### 完整部署指南

📖 **詳細的部署說明請參考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

包含：
- Supabase 專案設置
- 資料庫配置  
- 生產環境部署
- 常見問題解決

## 📱 系統預覽

### 投票系統界面

| 功能 | 預覽 |
|------|------|
| 投票列表 | 📊 多個投票狀態分類顯示 |
| 投票介面 | 🗳️ 簡潔直觀的投票操作 |
| 結果展示 | 📈 多種圖表視覺化 |
| 行動裝置 | 📱 完全響應式設計 |

### 示例投票

系統預置了三個示例投票供測試：

1. **🏡 社區管理費調整方案表決** (進行中)
   - 70元/80元/90元 三個選項
   - 展示完整投票流程

2. **🌕 中秋節社區活動規劃** (已結束)
   - 烤肉聚會/月餅DIY/賞月茶會
   - 展示投票結果和統計

3. **🎄 聖誕節佈置主題票選** (即將開始)
   - 傳統風格/北歐簡約/冰雪世界
   - 展示預告功能

## 🛠️ 技術架構

### 前端技術棧
```
Vue.js 3
├── Vue Router 4      # 路由管理
├── Vuex 4           # 狀態管理
├── Bootstrap 5      # UI 框架
└── Vite            # 建構工具
```

### 後端技術棧
```
Supabase
├── PostgreSQL      # 關聯式資料庫
├── Realtime        # 即時數據同步
├── Auth           # 用戶認證
└── RLS            # 行級安全控制
```

### 資料庫設計
```
voting_topics        # 投票主題
├── voting_options   # 投票選項
├── voting_records   # 投票記錄
├── voting_results   # 結果統計
└── voting_notifications # 通知記錄
```

## 📊 系統特色

### 🔒 安全性
- **匿名投票** - 保護用戶隱私
- **防重複投票** - 資料庫層面約束
- **權限控制** - RLS 行級安全
- **API 密鑰保護** - 環境變數管理

### ⚡ 效能
- **即時更新** - Supabase Realtime
- **響應式設計** - 適配所有設備
- **快速載入** - Vite 建構優化
- **CDN 支援** - 適合全球部署

### 🎨 用戶體驗
- **直觀操作** - 簡單易用的投票介面
- **視覺化圖表** - 多種數據展示方式
- **即時反饋** - 投票成功確認
- **進度追蹤** - 參與率即時顯示

## 📁 專案結構

```
bordeaux-ii/
├── public/              # 靜態資源
├── src/
│   ├── components/      # Vue 組件
│   │   ├── VotingList.vue      # 投票列表
│   │   ├── VotingDetail.vue    # 投票詳情  
│   │   └── VotingChart.vue     # 數據視覺化
│   ├── data/           # 資料庫腳本
│   │   ├── voting_schema.sql   # 表格結構
│   │   └── sample_voting_data.sql # 示例數據
│   ├── router/         # 路由配置
│   ├── store/          # 狀態管理
│   └── utils/          # 工具函數
│       └── supabase.js # Supabase API
├── .env.local          # 環境變數 (需手動創建)
├── DEPLOYMENT_GUIDE.md # 詳細部署指南
└── VOTING_SETUP.md     # 投票系統設置說明
```

## 🤝 開發指令

```bash
# 安裝依賴
npm install

# 開發模式 (熱重載)
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint
```

## 🙋 常見問題

### Q: 如何新增投票？
A: 在 Supabase Dashboard 的 SQL Editor 中執行插入語句，或開發管理介面。

### Q: 投票是否匿名？
A: 是的，系統只記錄統計資訊，不關聯具體用戶身份。

### Q: 支援多選投票嗎？
A: 目前支援單選，多選功能在開發路線圖中。

### Q: 如何自定義投票樣式？
A: 修改對應 Vue 組件的 `<style>` 區塊即可。

更多問題請查看 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 的常見問題章節。

## 🗺️ 開發路線圖

### 短期目標 (v1.1)
- [ ] 投票管理後台介面
- [ ] 多選投票支援
- [ ] 郵件通知功能
- [ ] 投票結果匯出

### 中期目標 (v1.2)  
- [ ] LINE Bot 整合
- [ ] QR Code 快速投票
- [ ] 投票數據分析
- [ ] 行動 App 版本

### 長期目標 (v2.0)
- [ ] 人工智能投票建議
- [ ] 區塊鏈投票驗證
- [ ] 多語言支援
- [ ] 智慧合約整合

## 📄 開源協議

此專案採用 [MIT License](./LICENSE) 開源協議。

---

⭐ **喜歡這個專案嗎？給我們一個 Star 吧！**

🏠 **讓社區管理更智慧，讓鄰里關係更緊密。**
