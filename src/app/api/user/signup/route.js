import User from "@/app/_utills/model/user";
import sendToken from "@/app/_utills/jwtToken";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDatabase from "@/app/_utills/db/db";


export async function POST(request) {
  await connectDatabase();
  try {
    const { name, email, password } = await request.json();

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return NextResponse.json({
        success: false,
        message: 'User already exists',
      }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

     return NextResponse.json({
      user,
      success: true,
      message: 'user has been created successfully',
    }, { status: 201 });
  

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Error creating user: ${error.message}`,
    }, { status: 500 });
  }
}


