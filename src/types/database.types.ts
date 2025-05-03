export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contracts: {
        Row: {
          id: string
          created_at: string
          user_id: string
          file_name: string
          file_type: string
          extracted_text: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          file_name: string
          file_type: string
          extracted_text?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          file_name?: string
          file_type?: string
          extracted_text?: string | null
          status?: string
        }
      }
      extracted_terms: {
        Row: {
          id: string
          created_at: string
          contract_id: string
          term_type: string
          term_value: string
          confidence_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          contract_id: string
          term_type: string
          term_value: string
          confidence_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          contract_id?: string
          term_type?: string
          term_value?: string
          confidence_score?: number | null
        }
      }
      user_queries: {
        Row: {
          id: string
          created_at: string
          contract_id: string
          question: string
          ai_response: string
          user_feedback: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          contract_id: string
          question: string
          ai_response: string
          user_feedback?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          contract_id?: string
          question?: string
          ai_response?: string
          user_feedback?: string | null
        }
      }
    }
  }
} 