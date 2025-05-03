import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test the connection by getting the count of contracts
    const { count, error } = await supabase
      .from('contracts')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      contractsCount: count
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    )
  }
} 