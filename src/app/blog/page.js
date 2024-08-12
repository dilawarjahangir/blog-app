import Image from 'next/image';
import Card from "../components/card";
import Styles from "./blog.module.css"; // Assuming this CSS file exists and is correctly set up

const fetchProduct = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Throw the error to be caught by the error boundary
  }
};

const page = async () => {
  let products = [];
  try {
    const productData = await fetchProduct();
    products = productData.products || [];
  } catch (error) {
    // Error will be caught by the error boundary
    return null; // Or you could return some placeholder UI
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center ">
      <h1 className="h1 my-4 text-lg">Blogs</h1>
      <div className="row align-items-center justify-content-center ">
        {products.map((product, key) => (
          <div className="mb-2  col-lg-4" key={product.id}>
            <Card id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              thumbnail={product.thumbnail}
        
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
