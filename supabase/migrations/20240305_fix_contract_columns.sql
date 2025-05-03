-- Drop existing columns if they exist (to avoid type mismatches)
ALTER TABLE contracts 
DROP COLUMN IF EXISTS end_date,
DROP COLUMN IF EXISTS start_date,
DROP COLUMN IF EXISTS notice_period_days,
DROP COLUMN IF EXISTS break_clause_text,
DROP COLUMN IF EXISTS parsing_successful,
DROP COLUMN IF EXISTS summary,
DROP COLUMN IF EXISTS user_id;

-- Add columns with correct types
ALTER TABLE contracts 
ADD COLUMN end_date DATE,
ADD COLUMN start_date DATE,
ADD COLUMN notice_period_days INTEGER,
ADD COLUMN break_clause_text TEXT,
ADD COLUMN parsing_successful BOOLEAN DEFAULT FALSE,
ADD COLUMN summary TEXT,
ADD COLUMN user_id UUID DEFAULT gen_random_uuid(); 