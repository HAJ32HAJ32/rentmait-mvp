import { createContract } from '@/lib/db/contracts';
import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client
let supabase: SupabaseClient;
try {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

export async function POST(request: Request) {
  try {
    const testContract = {
      extracted_text: "This is a test contract agreement between parties.",
      start_date: "2024-03-01",
      end_date: "2025-03-01",
      notice_period_days: 30,
      break_clause_text: "Either party may terminate this agreement with 30 days notice.",
      parsing_successful: true,
      summary: "Test contract summary"
    };

    // Create a test contract
    const contract = await createContract(testContract);
    
    return NextResponse.json({
      success: true,
      message: "Test contract created successfully",
      contract
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create test contract',
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Test the connection by getting the count of contracts
    const { data, error } = await supabase
      .from('contracts')
      .select('count');

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: `Supabase error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Supabase connection successful',
      count: data
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 