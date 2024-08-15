// Import necessary modules
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/app/_utills/model/user'; // Adjust the import path according to your project structure

export async function GET(request) {
  try {
    // Get the token from cookies
    const token = request.cookies.get('token')?.value;
    // console.log(token)
    // Check if token exists
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'User not logged in',
      }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch the user from the database
    const user = await User.findById(decoded.id).select("-password");

    // Check if user exists
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
      }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    // Handle errors
    return NextResponse.json({
      success: false,
      message: `Error getting user: ${error.message}`,
    }, { status: 500 });
  }
}
