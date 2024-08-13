import BlogPost from './_components/blogPost';



const page = async () => {


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center ">
      <h1 className="h1 my-4 text-lg">Blogs</h1>
      <div className="row align-items-center justify-content-center ">
        
         <BlogPost/>
      </div>
    </div>
  );
};

export default page;
