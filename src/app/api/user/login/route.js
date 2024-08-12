// src/app/api/user/login/route.js
import { NextResponse } from "next/server";
import User from "@/app/utills/model/user";
import connectDatabase from "@/app/utills/db/db";

export async function POST(request) {
  await connectDatabase();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Provide all fields',
      }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User does not exist',
        
      }, { status: 404 });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      }, { status: 400 });
    }

    // Token handling should be done in sendToken
    const token = await user.getJwtToken();
    const response = NextResponse.json({
      success: true,
      token,
      user,
    }, { status: 200 });

    response.cookies.set('token', token, {
      maxAge: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000, // e.g., 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure in production
    });

    return response;

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error logging in: ${error.message}`,
    }, { status: 500 });
  }
}
