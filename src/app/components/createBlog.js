"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { loadUser } from "../redux/slice";
import ReduxProvider from "../redux/provider";

function CreateBlogComponent() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <p className="text-red-600">You need to be logged in to create a post.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (tagsArray.length === 0) {
      setMessage("Please provide at least one valid tag.");
      return;
    }

    const newPost = {  title, body,user, tags: tagsArray };

    try {
      setLoading(true);
      const response = await fetch("/api/posts/createpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setMessage("Post created successfully!");
        setTitle("");
        setBody("");
        setTags("");
      } else {
        const errorData = await response.json();
        setMessage(`Failed to create post: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Create a New Post
      </h1>
      {message && <p className={`mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      {loading && <p className="mb-4 text-blue-600">Creating post...</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter post body"
            rows="4"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter tags"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-4 py-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default function CreateBlog() {
  return (
    <ReduxProvider>
      <CreateBlogComponent />
    </ReduxProvider>
  );
}
