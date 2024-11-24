import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null); // Product state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch product data based on the ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const data = await response.json();
        setProduct(data); // Set product data
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, [id]);

  // Add to cart functionality
  const handleAddToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token"); // Retrieve the token

    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/carts/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ productId, quantity }), 
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to add to cart.");
        return;
      }

      toast.success("Product added to cart!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Add to Cart Error:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>; // Show loading message while fetching
  }

  if (!product) {
    return <p className="text-center text-lg text-red-500">Product not found.</p>; // Show if no product is found
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
            <span className="text-2xl font-semibold text-primary">
              ${product.price}
            </span>
            <span className="badge badge-info">{product.availabilityStatus}</span>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-sm">Stock: {product.stock}</p>
            <p className="text-sm">Rating: {product.rating}</p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => handleAddToCart(product.id)}
              className="btn btn-ghost bg-primary hover:bg-primary text-white border-1 border-white hover:border-1 hover:border-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold">Additional Information</h3>
        <p>
          <strong>Shipping Info:</strong> {product.shippingInformation}
        </p>
        <p>
          <strong>Warranty:</strong> {product.warrantyInformation}
        </p>
        <p>
          <strong>Return Policy:</strong> {product.returnPolicy}
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
