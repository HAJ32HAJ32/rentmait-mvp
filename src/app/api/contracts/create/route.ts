import { NextResponse } from 'next/server';
import { createContract } from '@/lib/db/contracts';

export async function POST(request: Request) {
  try {
    console.log('Contract creation endpoint called');
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate required fields
    if (!body.extracted_text) {
      console.log('Missing required field: extracted_text');
      return NextResponse.json(
        { error: 'extracted_text is required' },
        { status: 400 }
      );
    }

    console.log('Creating contract with data:', {
      extracted_text: body.extracted_text,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      notice_period_days: body.notice_period_days || null,
      break_clause_text: body.break_clause_text || null,
      parsing_successful: body.parsing_successful || false,
      summary: body.summary || null,
    });

    // Create the contract
    const contract = await createContract({
      extracted_text: body.extracted_text,
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      notice_period_days: body.notice_period_days || null,
      break_clause_text: body.break_clause_text || null,
      parsing_successful: body.parsing_successful || false,
      summary: body.summary || null,
    });

    console.log('Contract created successfully:', contract);
    return NextResponse.json(contract);
  } catch (error: any) {
    console.error('Error creating contract:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Failed to create contract',
        details: error.message,
        code: error.code,
        hint: error.hint
      },
      { status: 500 }
    );
  }
} 