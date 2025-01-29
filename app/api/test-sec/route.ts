import { NextResponse } from 'next/server'
import SECClient from '../../../lib/sec/client'

export async function GET() {
  try {
    const client = new SECClient()
    
    // Test with a shorter date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 1) // Just last 24 hours
    
    console.log('Fetching filings from:', startDate, 'to:', endDate)
    const filingsList = await client.getFilingsList(startDate)
    
    return NextResponse.json({ 
      success: true, 
      message: 'SEC API test',
      url: client['url'], // Log the URL we're hitting
      filingsList 
    })
  } catch (error) {
    console.error('SEC API test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'SEC API test failed', 
        error: error.message || String(error)
      },
      { status: 500 }
    )
  }
}