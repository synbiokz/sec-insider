import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Just try to connect
    await prisma.$connect()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful' 
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed', 
        error: error.message 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}