import React from 'react'

const fetchProductDetail=async(id)=>{
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    return response.json()
}

const BlogDetailPage = async ({params}) => {
    
    const {id}=params
    const dataObj = await fetchProductDetail(id);
    console.log(dataObj)
  return (
    <div>On blog detail page {id} </div>
  )
}

export default BlogDetailPage