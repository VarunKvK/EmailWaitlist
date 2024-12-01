import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('waitlist')
    
    const count = await collection.countDocuments()
    
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 