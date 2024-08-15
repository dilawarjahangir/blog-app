// /src/app/api/posts/search/route.js

import { NextResponse } from "next/server";
import connectDatabase from "@/app/_utills/db/db";
import Post from "@/app/_utills/model/post";

export async function GET(req) {
  try {
    await connectDatabase();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ error: "Query parameter `q` is required" }, { status: 400 });
    }

    const posts = await Post.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ],
    }).select("title _id");

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to search posts" }, { status: 500 });
  }
}
