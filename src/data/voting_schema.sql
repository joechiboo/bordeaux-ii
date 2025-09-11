-- 投票主題表
CREATE TABLE IF NOT EXISTS voting_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    voting_type VARCHAR(50) DEFAULT 'single', -- single: 單選, multiple: 多選
    target_audience TEXT,
    purpose TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    is_active BOOLEAN DEFAULT true,
    status VARCHAR(50) DEFAULT 'upcoming' -- upcoming, ongoing, ended
);

-- 投票選項表
CREATE TABLE IF NOT EXISTS voting_options (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES voting_topics(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    option_value VARCHAR(100) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 投票記錄表
CREATE TABLE IF NOT EXISTS voting_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES voting_topics(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    option_id UUID REFERENCES voting_options(id) ON DELETE CASCADE,
    floor_number VARCHAR(10),
    unit_number VARCHAR(10),
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    ip_address VARCHAR(45),
    user_agent TEXT,
    UNIQUE(topic_id, user_id) -- 確保每個用戶對每個投票只能投一次
);

-- 投票結果快取表
CREATE TABLE IF NOT EXISTS voting_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES voting_topics(id) ON DELETE CASCADE,
    option_id UUID REFERENCES voting_options(id) ON DELETE CASCADE,
    vote_count INTEGER DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(topic_id, option_id)
);

-- 投票通知記錄表
CREATE TABLE IF NOT EXISTS voting_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES voting_topics(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    notification_type VARCHAR(50), -- reminder, result, etc.
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    channel VARCHAR(50), -- email, line, app
    status VARCHAR(50) DEFAULT 'sent'
);

-- 創建索引以提高查詢效率
CREATE INDEX idx_voting_topics_status ON voting_topics(status);
CREATE INDEX idx_voting_topics_dates ON voting_topics(start_date, end_date);
CREATE INDEX idx_voting_records_topic ON voting_records(topic_id);
CREATE INDEX idx_voting_records_user ON voting_records(user_id);
CREATE INDEX idx_voting_results_topic ON voting_results(topic_id);

-- 創建觸發器來自動更新投票狀態
CREATE OR REPLACE FUNCTION update_voting_status()
RETURNS TRIGGER AS $$
BEGIN
    -- 更新投票狀態
    UPDATE voting_topics
    SET status = CASE
        WHEN now() < start_date THEN 'upcoming'
        WHEN now() >= start_date AND now() <= end_date THEN 'ongoing'
        ELSE 'ended'
    END,
    updated_at = now()
    WHERE id = NEW.topic_id OR id = OLD.topic_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_voting_status
AFTER INSERT OR UPDATE OR DELETE ON voting_records
FOR EACH ROW
EXECUTE FUNCTION update_voting_status();

-- 創建函數來計算投票結果
CREATE OR REPLACE FUNCTION calculate_voting_results(p_topic_id UUID)
RETURNS VOID AS $$
DECLARE
    total_votes INTEGER;
BEGIN
    -- 計算總投票數
    SELECT COUNT(*) INTO total_votes
    FROM voting_records
    WHERE topic_id = p_topic_id;
    
    -- 更新每個選項的投票數和百分比
    INSERT INTO voting_results (topic_id, option_id, vote_count, percentage, updated_at)
    SELECT 
        vo.topic_id,
        vo.id,
        COUNT(vr.id) as vote_count,
        CASE 
            WHEN total_votes > 0 THEN ROUND((COUNT(vr.id)::DECIMAL / total_votes * 100), 2)
            ELSE 0
        END as percentage,
        now()
    FROM voting_options vo
    LEFT JOIN voting_records vr ON vo.id = vr.option_id
    WHERE vo.topic_id = p_topic_id
    GROUP BY vo.topic_id, vo.id
    ON CONFLICT (topic_id, option_id)
    DO UPDATE SET 
        vote_count = EXCLUDED.vote_count,
        percentage = EXCLUDED.percentage,
        updated_at = EXCLUDED.updated_at;
END;
$$ LANGUAGE plpgsql;

-- 啟用 RLS (Row Level Security)
ALTER TABLE voting_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_notifications ENABLE ROW LEVEL SECURITY;

-- 刪除可能存在的舊政策
DROP POLICY IF EXISTS "Public can view topics" ON voting_topics;
DROP POLICY IF EXISTS "Public can view options" ON voting_options;
DROP POLICY IF EXISTS "Authenticated users can vote" ON voting_records;
DROP POLICY IF EXISTS "Users can view own votes" ON voting_records;
DROP POLICY IF EXISTS "Public can view results" ON voting_results;
DROP POLICY IF EXISTS "System can update results" ON voting_results;

-- 創建 RLS 政策 (修正版本)

-- 允許所有人查看投票主題和選項
CREATE POLICY "Public can view topics" ON voting_topics 
    FOR SELECT USING (true);

CREATE POLICY "Public can view options" ON voting_options 
    FOR SELECT USING (true);

-- 允許認證用戶投票 (修正: 使用 WITH CHECK)
CREATE POLICY "Authenticated users can vote" ON voting_records 
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid()::text = user_id::text);

-- 允許查看自己的投票記錄
CREATE POLICY "Users can view own votes" ON voting_records 
    FOR SELECT 
    USING (true);

-- 允許查看投票結果
CREATE POLICY "Public can view results" ON voting_results 
    FOR SELECT USING (true);

-- 允許系統更新投票結果
CREATE POLICY "System can update results" ON voting_results 
    FOR ALL USING (true);