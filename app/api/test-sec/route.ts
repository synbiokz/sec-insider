import { NextResponse } from 'next/server'
import SECClient from '@/lib/sec/client'

export async function GET() {
  try {
    const client = new SECClient()
    
    // Get filings from the last 7 days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    
    const filingsList = await client.getFilingsList(startDate)
    
    return NextResponse.json({ 
      success: true, 
      message: 'SEC API test',
      filingsList 
    })
  } catch (error) {
    console.error('SEC API test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'SEC API test failed', 
        error: error.message 
      },
      { status: 500 }
    )
  }
}