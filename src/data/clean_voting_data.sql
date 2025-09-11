-- ⚠️ 警告：這會刪除所有投票相關資料！
-- 請先備份重要資料

-- 刪除所有投票資料（按依賴順序）
DELETE FROM voting_notifications;
DELETE FROM voting_results;
DELETE FROM voting_records;
DELETE FROM voting_options;
DELETE FROM voting_topics;

-- 確認清理結果
SELECT 'voting_topics' as table_name, COUNT(*) as remaining_count FROM voting_topics
UNION ALL
SELECT 'voting_options' as table_name, COUNT(*) as remaining_count FROM voting_options
UNION ALL
SELECT 'voting_records' as table_name, COUNT(*) as remaining_count FROM voting_records
UNION ALL
SELECT 'voting_results' as table_name, COUNT(*) as remaining_count FROM voting_results
UNION ALL
SELECT 'voting_notifications' as table_name, COUNT(*) as remaining_count FROM voting_notifications;