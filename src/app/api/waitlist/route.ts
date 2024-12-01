import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate email
    const { email } = emailSchema.parse(body)
    
    const db = await connectToDatabase()
    const collection = db.collection('waitlist')

    // Check if email already exists
    const existing = await collection.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Insert new email
    await collection.insertOne({
      email,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 