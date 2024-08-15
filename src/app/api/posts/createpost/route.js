import connectDatabase from "@/app/_utills/db/db";
import Post from "@/app/_utills/model/post";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDatabase();

  try {
    const {  title, body,user, tags } = await request.json();

    if (!user._id || !title || !body) {
      return NextResponse.json({ success: false, message: 'User id, title, and body are required.' }, { status: 400 });
    }

    const newPost = new Post({
      title,
      body,
      user,
      tags,
    });


    const myPost = await Post.create(newPost);

    return NextResponse.json({ success: true, message: 'Post created successfully!' }, { status: 201 });

  } catch (error) {

    return NextResponse.json({ success: false, message: `Error creating post: ${error.message}` }, { status: 500 });
  }
}
