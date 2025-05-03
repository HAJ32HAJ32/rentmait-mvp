import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { parseContractText } from '@/lib/contract-parser';

// Check environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

// Initialize Supabase client
let supabase: SupabaseClient;
try {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export async function POST(req: Request) {
  console.log('Received file upload request');
  
  try {
    const formData = await req.formData();
    console.log('Form data received:', formData);
    
    const file = formData.get('file') as File;
    const sessionId = formData.get('sessionId') as string;

    if (!file) {
      console.error('No file provided in request');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!sessionId) {
      console.error('No session ID provided in request');
      return NextResponse.json({ error: 'No session ID provided' }, { status: 400 });
    }

    console.log('Processing file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or Word document.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.error('File size exceeds limit:', file.size);
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Get the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log('File buffer created, size:', buffer.length);

    let extractedText: string;

    try {
      // Extract text based on file type
      if (file.type === 'application/pdf') {
        console.log('Extracting text from PDF');
        const data = await pdfParse(buffer);
        extractedText = data.text;
      } else {
        console.log('Extracting text from Word document');
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      }

      console.log('Text extracted successfully, length:', extractedText.length);

      // Parse the contract text
      console.log('Parsing contract text');
      const parsedData = await parseContractText(extractedText);
      console.log('Contract parsed successfully:', parsedData);

      // Save to database
      console.log('Saving to database');
      const { data, error } = await supabase
        .from('contracts')
        .insert([
          {
            session_id: sessionId,
            extracted_text: extractedText,
            start_date: parsedData.startDate,
            end_date: parsedData.endDate,
            notice_period_days: parsedData.noticePeriodDays,
            break_clause_text: parsedData.breakClauseText,
            parsing_successful: true,
            summary: parsedData.summary
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Data saved successfully:', data);

      return NextResponse.json({ 
        success: true, 
        data: {
          id: data.id,
          extractedText,
          ...parsedData
        }
      });
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process file' },
      { status: 500 }
    );
  }
} 