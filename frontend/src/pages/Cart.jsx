import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';  // Import SweetAlert2

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/carts/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,  // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Close',
        });
      }
    };

    fetchCartItems();
  }, [token]);

  // Handle remove from cart
  const handleRemove = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/carts/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Include token in headers
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove product from cart');
      }

      setCartItems(cartItems.filter(item => item.productid !== productId));
      Swal.fire({
        title: 'Removed!',
        text: 'The product has been removed from your cart.',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      toast.error(err.message);
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  // Handle update cart
  const handleUpdate = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:5000/api/carts/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Include token in headers
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      setCartItems(cartItems.map(item => item.productid === productId ? { ...item, quantity } : item));
   
    } catch (err) {
      toast.error(err.message);
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  if (loading) {
    return <div className="text-center py-6"><span className="loading loading-dots loading-lg"></span> Loading...</div>;
  }


  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.product.id}>
                <td>
                  <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 object-cover" />
                  <p>{item.product.title}</p>
                </td>
                <td>
                  {item.product.price && !isNaN(item.product.price) ? `$${item.product.price.toFixed(2)}` : 'N/A'}
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdate(item.productid, e.target.value)}
                    min="1"
                    className="input input-bordered w-16 text-center"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-error btn-sm text-white"
                    onClick={() => handleRemove(item.productid)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <button
          className="btn btn-primary"
          onClick={() => toast.success('Checkout functionality is not implemented yet.')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
