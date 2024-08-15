"use client";

import React, { useState, useEffect } from 'react';
import ShowingPost from './ShowingPost';

const fetchBlogs = async (page, pageSize) => {
  const response = await fetch(`http://localhost:3000/api/posts/getpagewise?page=${page}&pageSize=${pageSize}`, {
    cache: "no-store"
  });
  return response.json();
}

const BlogPostPagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadBlogs = async () => {
      const my_data = await fetchBlogs(page, pageSize);
      setData(my_data.posts || []);
      setTotalPages(my_data.totalPages || 1);
    };
    loadBlogs();
  }, [page, pageSize]); 
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="bg-gray-100 flex items-start justify-center p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
        <ShowingPost data={data} />
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Previous
            </button>
            <span className="text-gray-700">Page {page} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPagination;
