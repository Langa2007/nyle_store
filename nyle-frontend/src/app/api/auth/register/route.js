export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server'
import getPrisma from '@/lib/prisma'
import { rateLimitRequest } from '@/lib/apiRateLimit'

export async function POST(request) {
  try {
    const { limited } = rateLimitRequest({
      request,
      namespace: "auth-register",
      maxRequests: 8,
      windowMs: 15 * 60 * 1000,
    });

    if (limited) {
      return NextResponse.json(
        { message: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const { name, email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const db = await getPrisma();
    if (!db) {
      return NextResponse.json(
        { message: 'Internal server error: Database not available' },
        { status: 500 }
      )
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Handle bcrypt lazily
    const bcrypt = (await import('bcryptjs')).default;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      }
    })

    return NextResponse.json(
      { user, message: 'Registration successful' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
