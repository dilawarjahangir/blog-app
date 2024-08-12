import { NextResponse } from "next/server"; // Add this import

const sendToken = async (user, statusCode) => {
  const token = await user.getJwtToken();

  const response = NextResponse.json({
    success: true,
    token,
    user,
  }, { status: statusCode });

  response.cookies.set('token', token, {
    maxAge: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000, // 7 days as per your environment variable
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set secure to true in production
  });

  return response;
};

export default sendToken;
