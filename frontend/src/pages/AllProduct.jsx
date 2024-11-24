import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [products]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-center mb-8 text-primary">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="text-center text-lg min-h-screen">No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="card w-full bg-base-100 shadow-lg">
              <figure>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-xl font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex justify-between mt-4">
                  <span className="text-lg font-semibold">${product.price}</span>
                  <span className="badge badge-info">{product.availabilityStatus}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">Stock: {product.stock}</p>
                  <p className="text-sm">Rating: {product.rating}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link className="btn btn-ghost bg-primary hover:bg-primary text-white border-1 border-white hover:border-1 hover:border-white"
                  to={`/product/${product.id}`}>Details</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
