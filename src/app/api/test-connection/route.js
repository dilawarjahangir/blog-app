import connectDatabase from '@/app/utills/db/db';
import { NextResponse } from 'next/server';

// Assuming you're using the new app directory structure in Next.js 13 or later
export async function GET() {
  try {
    await connectDatabase();
    return NextResponse.json({ success: true, message: 'Database connected successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Database connection failed: ${error.message}` },
      { status: 500 }
    );
  }
}

