// src/pages/api/post/getpaginatedposts.js
import connectDatabase from "@/app/_utills/db/db";
import Post from "@/app/_utills/model/post";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDatabase();
  
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = parseInt(searchParams.get("pageSize")) || 10; 

  try {
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);
    
    if (page > totalPages) {
      return NextResponse.json({
        success: false,
        message: "Page number exceeds total pages available.",
      });
    }
    
    const posts = await Post.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    
    if (!posts || posts.length === 0) {
      return NextResponse.json({ success: false, message: "No posts found." });
    }
    
    return NextResponse.json({
      success: true,
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
      message: 'Posts fetched successfully!',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    return NextResponse.json({
      success: false,
      message: `Error getting posts: ${error.message}`,
    }, { status: 500 });
  }
}
