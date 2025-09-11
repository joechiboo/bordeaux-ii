-- 更新管理費投票選項
-- 將 70元、80元、90元 改為 不調整、90元、95元

-- 方法 1: 如果你知道具體的選項 ID，可以直接更新
-- 先查看現有選項
SELECT id, option_text, option_value, description 
FROM voting_options vo
JOIN voting_topics vt ON vo.topic_id = vt.id
WHERE vt.title LIKE '%管理費%'
ORDER BY vo.order_index;

-- 方法 2: 批量更新（建議使用這個）
-- 更新第一個選項：70元 → 不調整
UPDATE voting_options 
SET option_text = '維持現狀不調整',
    option_value = 'no_change',
    description = '維持現有管理費標準，繼續現有的服務水準'
FROM voting_topics vt
WHERE voting_options.topic_id = vt.id 
  AND vt.title LIKE '%管理費%'
  AND voting_options.order_index = 1;

-- 更新第二個選項：80元 → 90元
UPDATE voting_options 
SET option_text = '調整為每月 90 元',
    option_value = '90',
    description = '增加公共區域照明與植栽維護，包含：原有服務 + 景觀燈具維護、綠化植栽照料、小型設施修繕'
FROM voting_topics vt
WHERE voting_options.topic_id = vt.id 
  AND vt.title LIKE '%管理費%'
  AND voting_options.order_index = 2;

-- 更新第三個選項：90元 → 95元
UPDATE voting_options 
SET option_text = '調整為每月 95 元',
    option_value = '95',
    description = '全面升級設施、增設監視系統，包含：原有服務 + 全新監視設備、電梯維護升級、公共wifi、24小時保全'
FROM voting_topics vt
WHERE voting_options.topic_id = vt.id 
  AND vt.title LIKE '%管理費%'
  AND voting_options.order_index = 3;

-- 驗證更新結果
SELECT id, option_text, option_value, description, order_index
FROM voting_options vo
JOIN voting_topics vt ON vo.topic_id = vt.id
WHERE vt.title LIKE '%管理費%'
ORDER BY vo.order_index;