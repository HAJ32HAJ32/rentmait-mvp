import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { analyzeContract } from '@/lib/openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { sessionId, question } = await req.json();

    if (!sessionId || !question) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the most recent contract for this session
    const { data: contracts, error: dbError } = await supabase
      .from('contracts')
      .select('extracted_text')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (dbError) {
      console.error('Error fetching contract:', dbError);
      return NextResponse.json(
        { error: 'Failed to fetch contract' },
        { status: 500 }
      );
    }

    if (!contracts || contracts.length === 0) {
      return NextResponse.json(
        { error: 'No contract found for this session' },
        { status: 404 }
      );
    }

    const contractText = contracts[0].extracted_text;

    // Analyze the contract using OpenAI
    const analysis = await analyzeContract(contractText, question);

    return NextResponse.json({ 
      success: true,
      response: analysis
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 