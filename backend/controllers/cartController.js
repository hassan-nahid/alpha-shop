import axios from 'axios';
import pool from '../db.js';



export const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);

    const cartItemsWithProducts = await Promise.all(
      result.rows.map(async (cartItem) => {
        const productId = cartItem.productId;
        try {
          // Fetch product data using the external API
          const response = await axios.get(`https://dummyjson.com/products/${productId}`);
          return {
            ...cartItem,
            product: response.data // Add product details to cart item
          };
        } catch (err) {
          console.error(`Error fetching product with ID ${productId}:`, err.message);
          return { ...cartItem, product: null }; // Add null product data if error occurs
        }
      })
    );

    // Send back the cart items along with product details
    res.json(cartItemsWithProducts);
  } catch (err) {
    console.error("Error fetching cart items:", err.message);
    res.status(500).json({ error: 'Database error' });
  }
};


export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user?.userId;


  if (!productId || !quantity || !userId) {
    console.error("Missing data:", { productId, quantity, userId });
    return res.status(400).json({ error: "Missing productId, quantity, or userId." });
  }

  try {
    // Directly insert into the carts table without checking if the product exists
    const query = 'INSERT INTO carts (user_id, productId, quantity) VALUES ($1, $2, $3)';


    await pool.query(query, [userId, productId, quantity]);
    res.status(201).json({ message: "Product added to cart" });
  } catch (err) {
    console.error("Error adding product to cart:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};



export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    await pool.query(
      'UPDATE carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
      [quantity, userId, productId]
    );
    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const deleteFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    await pool.query('DELETE FROM carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};
