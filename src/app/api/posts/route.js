import { NextResponse } from 'next/server';
import connectDatabase from '@/app/utills/db/db'; // Adjust path as necessary
import Post from '@/app/utills/model/post'; // Adjust path as necessary

export async function POST(request) {
  await connectDatabase(); // Ensure database connection

  try {
    const { title, body, tags ,user } = await request.json();

    // Validate input data
    if (!title || !body) {
      return NextResponse.json({ success: false, message: 'Title and body are required.' }, { status: 400 });
    }

    // Create a new post
    const newPost = new Post({
      title,
      body,
      tags,
      createdAt: new Date(),
    });

    await newPost.save();

    return NextResponse.json({ success: true, message: 'Post created successfully!' }, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ success: false, message: `Error creating post: ${error.message}` }, { status: 500 });
  }
}
