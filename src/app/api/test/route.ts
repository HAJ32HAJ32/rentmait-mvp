import { createContract } from '@/lib/db/contracts';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    const { data: contracts, error } = await supabase
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      contracts
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch test contracts',
        details: error.message
      },
      { status: 500 }
    );
  }
} 