export type Contract = {
  id: string;
  session_id: string;
  extracted_text: string;
  start_date: string | null;
  end_date: string | null;
  notice_period_days: number | null;
  break_clause_text: string | null;
  upload_timestamp: string;
  parsing_successful: boolean;
  summary: string | null;
  created_at: string;
}; 