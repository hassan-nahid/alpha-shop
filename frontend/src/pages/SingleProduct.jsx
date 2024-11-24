import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return <p className="text-center text-lg">Loading...</p>; 
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-96 h-96 object-cover rounded-xl"
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title text-3xl font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="flex justify-between mt-4">
            <span className="text-2xl font-semibold text-primary">${product.price}</span>
            <span className="badge badge-info">{product.availabilityStatus}</span>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm">Stock: {product.stock}</p>
            <p className="text-sm">Rating: {product.rating}</p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-ghost bg-primary hover:bg-primary text-white border-1 border-white hover:border-1 hover:border-white">Add to Cart</button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold">Additional Information</h3>
        <p><strong>Shipping Info:</strong> {product.shippingInformation}</p>
        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
