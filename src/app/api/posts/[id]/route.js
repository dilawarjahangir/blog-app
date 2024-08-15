import connectDatabase from "@/app/_utills/db/db";
import Post from "@/app/_utills/model/post";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  await connectDatabase();

  try {
    const { id } = params;

  
    console.log('ID received:', id);

   
    if (!mongoose.Types.ObjectId.isValid(id)) {
    
      return NextResponse.json({ success: false, message: 'Invalid ID format.' }, { status: 400 });
    }

 
    const post = await Post.findById(id);

    if (!post) {
           return NextResponse.json({ success: false, message: 'Post not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post }, { status: 200 });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ success: false, message: `Error fetching post: ${error.message}` }, { status: 500 });
  }
}
