-- Add missing columns to existing contracts table
ALTER TABLE contracts 
ADD COLUMN IF NOT EXISTS session_id UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS break_clause_text TEXT,
ADD COLUMN IF NOT EXISTS parsing_successful BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS summary TEXT;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_contracts_session_id ON contracts(session_id);
CREATE INDEX IF NOT EXISTS idx_contracts_created_at ON contracts(created_at);

-- Ensure RLS is enabled and policies exist
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous read access" ON contracts;
DROP POLICY IF EXISTS "Allow anonymous insert access" ON contracts;

-- Recreate policies
CREATE POLICY "Allow anonymous read access" ON contracts
    FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous insert access" ON contracts
    FOR INSERT
    TO anon
    WITH CHECK (true); 