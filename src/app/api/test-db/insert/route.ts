import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Insert a test contract
    const { data, error } = await supabase
      .from('contracts')
      .insert([
        {
          file_name: 'test-contract.pdf',
          file_type: 'pdf',
          user_id: 'test-user-id', // This will be replaced with actual auth later
          status: 'test'
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Test contract inserted successfully',
      data
    })
  } catch (error) {
    console.error('Insert test failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to insert test contract' },
      { status: 500 }
    )
  }
} 