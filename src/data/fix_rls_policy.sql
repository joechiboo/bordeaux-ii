-- 修復 RLS 政策，暫時允許所有人投票 (開發測試用)
DROP POLICY IF EXISTS "Authenticated users can vote" ON voting_records;
DROP POLICY IF EXISTS "Users can view own votes" ON voting_records;

-- 創建寬鬆的政策來允許投票 (測試用)
CREATE POLICY "Allow voting for testing" ON voting_records 
    FOR ALL USING (true) WITH CHECK (true);

-- 如果需要更嚴格的政策，可以稍後更換為：
-- CREATE POLICY "Authenticated users can vote" ON voting_records 
--     FOR INSERT WITH CHECK (user_id IS NOT NULL);
-- 
-- CREATE POLICY "Users can view own votes" ON voting_records 
--     FOR SELECT USING (user_id IS NOT NULL);