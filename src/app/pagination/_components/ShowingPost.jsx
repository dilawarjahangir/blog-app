import Link from 'next/link'
import React from 'react'

const ShowingPost = ({data}) => {
  return (
    <div>
    {data.length > 0 ? (
      data.map((post) => (
        <div className='p-4 mt-4' key={post._id}>
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
          <Link className='btn btn-primary' href={`/blog/${post._id}`}>
          More Details
          </Link>
        </div>
      ))
    ) : (
      <p className="text-gray-600">No posts available.</p>
    )}
</div>
 
  )
}

export default ShowingPost