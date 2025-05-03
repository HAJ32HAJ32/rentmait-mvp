import { createClient } from '@supabase/supabase-js';
import { Contract } from '@/types/contract';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createContract(contractData: Omit<Contract, 'id' | 'session_id' | 'created_at' | 'upload_timestamp'>) {
  console.log('Creating contract with data:', contractData);
  const { data, error } = await supabase
    .from('contracts')
    .insert([contractData])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  console.log('Contract created successfully:', data);
  return data as Contract;
}

export async function getContractBySessionId(sessionId: string) {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error) throw error;
  return data as Contract;
}

export async function updateContract(id: string, updates: Partial<Contract>) {
  const { data, error } = await supabase
    .from('contracts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Contract;
} 