import connectDatabase from "@/app/utills/db/db";
import Post from "@/app/utills/model/post";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  await connectDatabase();
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID format." }, { status: 400 });
    }
    const { reply, email } = await request.json();

    if (!reply || !email) {
      return NextResponse.json({ success: false, message: "Reply and email are required." }, { status: 400 });
    }
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { replies: { reply, email, date: new Date() } },
      },
      { new: true } 
    );
    if (!post) {
      return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Reply added successfully!", post }, { status: 200 });
  } catch (error) {
    console.error("Error adding reply:", error);
    return NextResponse.json({ success: false, message: `Error adding reply: ${error.message}` }, { status: 500 });
  }
}
