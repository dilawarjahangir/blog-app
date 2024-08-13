// src/pages/api/post/getallpost.js
import connectDatabase from "@/app/utills/db/db"; // Ensure the correct path to your db connection
import Post from "@/app/utills/model/post"; // Ensure the correct path to your Post model
import { NextResponse } from "next/server";

export async function  GET() {
  await connectDatabase();
  try {
    const posts = await Post.find({});
    
    if (!posts || posts.length === 0) {
      return NextResponse.json({success:false ,message:"No blogs"})
    }
    
    return NextResponse.json({ posts, success: true, message: 'Post created successfully!' }, { status: 201 });
} catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({success:false ,message:`Error getting post ${error.message} `})
  }
}
