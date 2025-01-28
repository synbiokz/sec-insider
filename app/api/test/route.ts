import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection by attempting to create and delete a test filing
    const testFiling = await prisma.filing.create({
      data: {
        filingDate: new Date(),
        documentURL: 'test-url',
        issuerName: 'Test Company',
        issuerTicker: 'TEST',
        reportingOwner: { name: 'Test Owner', title: 'Test Title', ownerType: 'director' },
        transactions: [{ 
          transactionDate: new Date(),
          transactionCode: 'P',
          transactionType: 'Common Stock',
          amount: 100,
          pricePerShare: 10,
          totalValue: 1000,
          sharesOwned: 1000
        }],
        status: 'test'
      }
    })

    // Delete the test filing immediately
    await prisma.filing.delete({
      where: { id: testFiling.id }
    })

    return NextResponse.json({ success: true, message: 'Database connection successful' })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json(
      { success: false, message: 'Database connection failed', error: error.message },
      { status: 500 }
    )
  }
}
}