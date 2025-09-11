-- 檢查現有投票資料
SELECT 'voting_topics' as table_name, COUNT(*) as count FROM voting_topics
UNION ALL
SELECT 'voting_options' as table_name, COUNT(*) as count FROM voting_options
UNION ALL
SELECT 'voting_records' as table_name, COUNT(*) as count FROM voting_records
UNION ALL
SELECT 'voting_results' as table_name, COUNT(*) as count FROM voting_results;

-- 查看現有投票主題
SELECT id, title, status, created_at FROM voting_topics ORDER BY created_at;