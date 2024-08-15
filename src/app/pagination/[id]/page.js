import React from "react";
import ReplyForm from "../_components/GiveReply";
import { remark } from "remark";
import html from "remark-html";


const fetchBlogDetail = async (id) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: "no-store" });


  if (!response.ok) {
    return null;
  }


  try {
    return await response.json();
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

// Function to convert markdown to HTML
const markdownToHtml = async (markdown) => {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
};

const BlogDetailPage = async ({ params }) => {
  const { id } = params;
  const dataObj = await fetchBlogDetail(id);

  if (!dataObj) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-2xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <p className="text-gray-600">Blog not found or an error occurred.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Convert the Markdown title, body, and tags to HTML
  const titleHtml = await markdownToHtml(dataObj.post.title);
  const contentHtml = await markdownToHtml(dataObj.post.body);

  // Convert each tag to HTML
  const tagsHtml = await Promise.all(
    dataObj.post.tags.map(async (tag) => await markdownToHtml(tag))
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative w-full py-3 sm:max-w-4xl sm:mx-auto">
        <div className="absolute w-full inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative w-full px-8 py-12 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="w-full mx-auto">
            <div>
              {/* Render the HTML title parsed from Markdown */}
              <h1 className="text-3xl font-semibold text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: titleHtml }} />
              </h1>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">By:</span> {dataObj.post.user.name}
                <span className="font-semibold"> Email:</span> {dataObj.post.user.email}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Published on: {new Date(dataObj.post.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-6 text-gray-700">
              {/* Render the HTML content parsed from Markdown */}
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800">Tags:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {tagsHtml.map((tagHtml, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    <div dangerouslySetInnerHTML={{ __html: tagHtml }} />
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800">Replies:</h3>
              <div className="mt-4 space-y-4">
                {dataObj.post.replies && dataObj.post.replies.length > 0 ? (
                  dataObj.post.replies.map((reply, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Reply: </span> {reply.reply}
                      </p>
                      <p className="text-gray-600 mb-1">
                        <span className="font-semibold">Email: </span> {reply.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Date: </span> {new Date(reply.date).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No replies yet.</p>
                )}
              </div>
              <ReplyForm postId={dataObj.post._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
