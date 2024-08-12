import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Clear the token cookie by setting it to expire in the past
    const response = NextResponse.json({
      success: true,
      message: 'User logged out successfully',
    });
    response.cookies.set('token', '', { path: '/', expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error logging out: ${error.message}`,
    }, { status: 500 });
  }
}
