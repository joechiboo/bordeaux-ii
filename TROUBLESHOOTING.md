# 🔧 故障排除指南

## 🚨 常見 Supabase 部署錯誤

### 錯誤 1: `ERROR: 42601: only WITH CHECK expression allowed for INSERT`

**問題描述**: 執行 `voting_schema.sql` 時出現 RLS 政策語法錯誤

**解決方案**:
```sql
-- ❌ 錯誤的語法 (原始文件)
CREATE POLICY "Authenticated users can vote" ON voting_records 
FOR INSERT TO authenticated
USING (auth.uid()::text = user_id::text);

-- ✅ 正確的語法 (修正版本)
CREATE POLICY "Authenticated users can vote" ON voting_records 
FOR INSERT TO authenticated
WITH CHECK (auth.uid()::text = user_id::text);
```

**修復步驟**:
1. 在 Supabase SQL Editor 中執行修正版本：`src/data/voting_schema_fixed.sql`
2. 或者手動修改原有政策：
   ```sql
   DROP POLICY IF EXISTS "Authenticated users can vote" ON voting_records;
   CREATE POLICY "Authenticated users can vote" ON voting_records 
   FOR INSERT TO authenticated
   WITH CHECK (auth.uid()::text = user_id::text);
   ```

---

### 錯誤 2: `Failed to create project` 或連線超時

**可能原因**:
- Supabase 服務暫時不可用
- 網路連線問題
- 專案配額已滿

**解決方案**:
1. 檢查 [Supabase 服務狀態](https://status.supabase.com/)
2. 更換網路環境或使用 VPN
3. 檢查帳戶是否有未付費用
4. 等待幾分鐘後重試

---

### 錯誤 3: `Invalid API key` 或 `Unauthorized`

**問題描述**: 前端無法連接到 Supabase

**檢查清單**:
1. **確認 API Key 類型**:
   ```javascript
   // ✅ 使用 anon key (公開金鑰)
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   
   // ❌ 不要使用 service_role key (私密金鑰)
   ```

2. **檢查環境變數文件**:
   ```bash
   # 確認文件名稱正確
   ls -la | grep env
   # 應該看到 .env.local (不是 .env.example)
   ```

3. **重新啟動開發服務器**:
   ```bash
   npm run dev
   # 或按 Ctrl+C 停止，然後重新執行
   ```

4. **檢查 Supabase 專案狀態**:
   - 進入 Supabase Dashboard
   - 確認專案狀態為 "Active"
   - 檢查 API 設定頁面

---

## 🐛 Vue.js 開發錯誤

### 錯誤 4: `Module not found` 或 Import 錯誤

**常見情況**:
```javascript
// ❌ 路徑錯誤
import { supabase } from './supabase.js'

// ✅ 正確路徑
import { supabase } from '../utils/supabase.js'
```

**解決方案**:
1. 檢查文件路徑是否正確
2. 確認文件是否存在
3. 檢查文件名稱大小寫 (Linux/Mac 區分大小寫)

---

### 錯誤 5: `Cannot read property of undefined`

**常見原因**: Vue 組件中訪問未初始化的響應式資料

**解決方案**:
```vue
<template>
  <!-- ❌ 可能出錯 -->
  <div>{{ voting.title }}</div>
  
  <!-- ✅ 安全寫法 -->
  <div v-if="voting">{{ voting.title }}</div>
  <!-- 或者 -->
  <div>{{ voting?.title || '載入中...' }}</div>
</template>
```

---

### 錯誤 6: Vite 開發服務器無法啟動

**錯誤訊息**: `EADDRINUSE: address already in use`

**解決方案**:
```bash
# 方法 1: 殺掉佔用端口的進程
lsof -ti:5173 | xargs kill -9

# 方法 2: 使用不同端口
npm run dev -- --port 3000

# 方法 3: 清除 node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## 🗃️ 資料庫相關問題

### 錯誤 7: `relation "voting_topics" does not exist`

**問題**: 資料表未正確創建

**解決方案**:
1. 檢查 SQL 腳本是否完全執行
2. 在 Supabase SQL Editor 中驗證表格：
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name LIKE 'voting%';
   ```
3. 重新執行 `voting_schema_fixed.sql`

---

### 錯誤 8: `RLS policy violation` 或投票功能無法使用

**問題**: Row Level Security 政策配置錯誤

**診斷步驟**:
```sql
-- 檢查 RLS 是否啟用
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename LIKE 'voting%';

-- 檢查現有政策
SELECT schemaname, tablename, policyname, cmd, roles 
FROM pg_policies 
WHERE tablename LIKE 'voting%';
```

**修復方案**:
```sql
-- 重新創建政策
DROP POLICY IF EXISTS "Authenticated users can vote" ON voting_records;
CREATE POLICY "Authenticated users can vote" ON voting_records 
FOR INSERT TO authenticated
WITH CHECK (auth.uid()::text = user_id::text);
```

---

## 🚀 部署相關問題

### 錯誤 9: Vercel/Netlify 部署失敗

**常見問題**:
1. **環境變數未設定**:
   - 檢查部署平台的環境變數設定
   - 確認變數名稱與本地 `.env.local` 一致

2. **建構錯誤**:
   ```bash
   # 本地測試建構
   npm run build
   
   # 檢查輸出錯誤
   npm run preview
   ```

3. **路徑問題**:
   - 檢查 `vue.config.js` 或 `vite.config.js` 中的 `base` 設定
   - 確認靜態資源路徑正確

---

### 錯誤 10: 生產環境白屏或功能異常

**檢查步驟**:
1. 開啟瀏覽器開發者工具
2. 查看 Console 錯誤訊息
3. 檢查 Network 標籤的請求狀態
4. 確認環境變數在生產環境中正確設定

---

## 📊 投票系統特定問題

### 錯誤 11: 投票列表顯示空白

**可能原因**:
1. 示例資料未載入
2. API 連接失敗
3. 權限問題

**解決方案**:
```sql
-- 檢查是否有投票資料
SELECT COUNT(*) FROM voting_topics;

-- 如果為空，執行示例資料腳本
-- src/data/sample_voting_data.sql
```

---

### 錯誤 12: 無法投票或投票失敗

**檢查清單**:
1. 用戶是否已登入
2. 投票狀態是否為 "ongoing"
3. 用戶是否已經投過票
4. RLS 政策是否正確

**除錯 SQL**:
```sql
-- 檢查投票記錄
SELECT * FROM voting_records 
WHERE topic_id = 'your-topic-id' 
AND user_id = 'your-user-id';

-- 檢查投票狀態
SELECT id, title, status, start_date, end_date 
FROM voting_topics 
WHERE id = 'your-topic-id';
```

---

## 🔍 除錯技巧

### 啟用詳細日誌
```javascript
// 在 src/utils/supabase.js 中添加
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('API Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

// 在 API 調用中添加錯誤處理
try {
  const { data, error } = await supabase
    .from('voting_topics')
    .select('*');
  
  if (error) {
    console.error('Supabase error:', error);
    console.error('Error details:', error.details);
    console.error('Error hint:', error.hint);
  }
} catch (err) {
  console.error('Network error:', err);
}
```

### 使用 Supabase 內建除錯工具
1. 在 Supabase Dashboard 進入 "Logs" 頁面
2. 選擇 "API" 或 "Database" 標籤
3. 查看即時日誌和錯誤訊息

---

## 📞 獲得幫助

### 自助資源
- [Supabase 文檔](https://supabase.com/docs)
- [Vue.js 官方文檔](https://vuejs.org/guide/)
- [Vite 文檔](https://vitejs.dev/guide/)

### 社群支援
- [Supabase Discord](https://discord.supabase.com/)
- [Vue.js Discord](https://discord.com/invite/vue)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase+vue.js)

### 報告問題
如果遇到未解決的問題：
1. 收集錯誤訊息和日誌
2. 記錄重現步驟
3. 在專案 GitHub 創建 Issue
4. 提供系統環境資訊

---

⚡ **提示**: 大多數問題都與環境變數配置或 Supabase 權限設定有關。遇到問題時，首先檢查這兩個方面！