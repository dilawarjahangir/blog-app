import Link from 'next/link';
import React from 'react';


const  fectchBlogs  = async()=> {
    const response = await fetch(`http://localhost:3000/api/posts/getallposts`,{cache:"no-store"});
    return response.json()
 }
const BlogPost = async() => {

    const my_data = await fectchBlogs()
    const data  = my_data.posts
  return (
    <div  className="bg-gray-100 flex items-start justify-center p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="  p-6 p">
          {data && data.length > 0 ? (
            data.map((post) => (
              <div  className=' p-4 mt-4' key={post._id}>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Author Details:</h2>
                  <p className="text-gray-600"><span className="font-semibold">Name:</span> {post.user.name}</p>
                  <p className="text-gray-600"><span className="font-semibold">Email:</span> {post.user.email}</p>
                </div>

          
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h1>

        
                <p className="text-gray-700 mb-4">{post.body}</p>

          
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post._id}`} className='btn btn-primary' >More Details</Link>
              </div>

            ))
          ) : (
            <p className="text-gray-600">No posts available.</p>
          )}
           
        </div>
        
      </div>
      
    </div>
  );
};

 

   

export default BlogPost;
