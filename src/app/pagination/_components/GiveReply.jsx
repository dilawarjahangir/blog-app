"use client";
import React, { useState } from "react";

const ReplyForm = ({ postId }) => {
  const [reply, setReply] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (reply && email) {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}/reply`,  {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reply, email }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess("Reply added successfully!");
          setReply("");
          setEmail("");
          window.location.reload()
        } else {
          setError(data.message || "Something went wrong.");
        }
      } catch (error) {
        setError("Failed to submit reply. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in both fields.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a Reply</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="reply"
          >
            Your Reply
          </label>
          <textarea
            id="reply"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Reply"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default ReplyForm;
