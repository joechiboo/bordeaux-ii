-- 插入示例投票主題：社區管理費調整表決
INSERT INTO voting_topics (
  title, 
  description, 
  start_date, 
  end_date, 
  voting_type, 
  target_audience, 
  purpose, 
  attachments, 
  status
) VALUES (
  '🏡 社區管理費調整方案表決',
  '為了提升社區服務品質與設施維護，管委會提出三個管理費調整方案，請各位住戶投票決定最適合的方案。新的管理費標準將於2025年10月起生效。',
  '2025-09-15 00:00:00+00',
  '2025-09-22 23:59:59+00',
  'single',
  '本社區住戶（需登入驗證）',
  '依多數意見決定新管理費標準，自10月起生效',
  '[
    {"name": "各方案預算明細表.pdf", "url": "#"},
    {"name": "管理委員會建議書.pdf", "url": "#"},
    {"name": "過去一年管理費使用報告.pdf", "url": "#"}
  ]',
  'ongoing'
);

-- 獲取剛插入的投票主題 ID
-- 然後插入投票選項 (不指定 ID，讓系統自動生成)
INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '調整為每月 70 元',
  '70',
  '維持基本清潔與保全服務，包含：定期清掃公共區域、垃圾收集、基本保全巡邏',
  1
FROM voting_topics 
WHERE title = '🏡 社區管理費調整方案表決';

INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '調整為每月 80 元',
  '80',
  '增加公共區域照明與植栽維護，包含：原有服務 + 景觀燈具維護、綠化植栽照料、小型設施修繕',
  2
FROM voting_topics 
WHERE title = '🏡 社區管理費調整方案表決';

INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '調整為每月 90 元',
  '90',
  '全面升級設施、增設監視系統，包含：原有服務 + 全新監視設備、電梯維護升級、公共wifi、24小時保全',
  3
FROM voting_topics 
WHERE title = '🏡 社區管理費調整方案表決';

-- 插入第二個投票主題：社區中秋活動規劃
INSERT INTO voting_topics (
  title, 
  description, 
  start_date, 
  end_date, 
  voting_type, 
  target_audience, 
  purpose, 
  attachments, 
  status
) VALUES (
  '🌕 2025年中秋節社區活動規劃',
  '一年一度的中秋佳節即將到來，管委會希望舉辦溫馨的社區活動，讓鄰居們能夠聚在一起共度佳節。請大家投票選擇最喜歡的活動形式！',
  '2025-09-01 00:00:00+00',
  '2025-09-10 23:59:59+00',
  'single',
  '本社區住戶及其家庭成員',
  '促進鄰里感情，打造溫馨社區氛圍',
  '[
    {"name": "往年活動照片集.pdf", "url": "#"},
    {"name": "活動預算規劃.pdf", "url": "#"}
  ]',
  'ended'
);

-- 插入第二個投票的選項
INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '中庭烤肉聚會',
  'bbq',
  '在社區中庭舉辦烤肉活動，每戶準備一道菜，大家一起分享美食、賞月聊天',
  1
FROM voting_topics 
WHERE title = '🌕 2025年中秋節社區活動規劃';

INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '月餅製作DIY',
  'mooncake',
  '邀請專業師傅教學，住戶一起製作傳統月餅，親子同樂，帶回家與家人分享',
  2
FROM voting_topics 
WHERE title = '🌕 2025年中秋節社區活動規劃';

INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '賞月茶會',
  'tea_party',
  '在頂樓天台舉辦優雅茶會，提供精緻茶點，一邊品茶一邊欣賞美麗月色',
  3
FROM voting_topics 
WHERE title = '🌕 2025年中秋節社區活動規劃';

-- 插入第三個投票主題：聖誕節佈置
INSERT INTO voting_topics (
  title, 
  description, 
  start_date, 
  end_date, 
  voting_type, 
  target_audience, 
  purpose, 
  attachments, 
  status
) VALUES (
  '🎄 聖誕節社區佈置主題票選',
  '聖誕節即將到來，讓我們一起為社區增添節慶氣氛！請大家選擇最喜歡的佈置主題，我們將根據投票結果來裝飾社區公共空間。',
  '2025-11-01 00:00:00+00',
  '2025-11-07 23:59:59+00',
  'single',
  '全體社區住戶',
  '營造溫馨節慶氛圍，增進社區凝聚力',
  '[]',
  'upcoming'
);

-- 插入第三個投票的選項
INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '傳統紅綠主題',
  'traditional',
  '經典的紅色與綠色搭配，聖誕樹、彩帶、鈴鐺等傳統裝飾',
  1
FROM voting_topics 
WHERE title = '🎄 聖誕節社區佈置主題票選';

INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '北歐簡約風格',
  'nordic',
  '白色、金色、原木色調，營造溫暖簡約的北歐聖誕氛圍',
  2
FROM voting_topics 
WHERE title = '🎄 聖誕節社區佈置主題票選';

INSERT INTO voting_options (topic_id, option_text, option_value, description, order_index) 
SELECT 
  id,
  '夢幻冰雪世界',
  'winter_wonderland',
  '藍色、銀色、白色主調，雪花、冰晶裝飾，打造夢幻冬日場景',
  3
FROM voting_topics 
WHERE title = '🎄 聖誕節社區佈置主題票選';