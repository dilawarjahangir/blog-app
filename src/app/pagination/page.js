import BlogPostPagination from './_components/blogPostPagination';



const page = async () => {


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center ">
      <h1 className="h1 my-4 text-lg">Blogs</h1>
      <div className="row align-items-center justify-content-center ">
        
         <BlogPostPagination/>
      </div>
    </div>
  );
};

export default page;
