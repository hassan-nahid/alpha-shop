import axios from 'axios';
import pool from '../db.js';



export const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Fetch cart items from the database based on the user ID
    const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);

    // If no cart items are found, return an empty array with a 200 OK response
    if (result.rows.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404
    }

    // Map over the cart items and fetch product data for each cart item
    const cartItemsWithProducts = await Promise.all(
      result.rows.map(async (cartItem) => {
        const productId = cartItem.productid; // Correct the field name to `productid`
        console.log(cartItem); // Log to inspect the structure of each cart item

        // Handle case where productId is missing or invalid
        if (!productId) {
          console.warn(`Skipping cart item with missing productId: ${cartItem.id}`);
          return { ...cartItem, product: null }; // Return cart item with no product data
        }

        try {
          // Fetch product details from an external API
          const response = await axios.get(`https://dummyjson.com/products/${productId}`);
          console.log(response.data); // Log the fetched product data
          return {
            ...cartItem,
            product: response.data, // Add product details to cart item
          };
        } catch (err) {
          // Log and handle any errors while fetching the product
          console.error(`Error fetching product with ID ${productId}:`, err.message);
          return { ...cartItem, product: null }; // Return cart item with no product data
        }
      })
    );

    // Respond with the cart items that include product details
    res.json(cartItemsWithProducts);
  } catch (err) {
    // Handle errors in database query
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
      'UPDATE carts SET quantity = $1 WHERE user_id = $2 AND productId = $3',
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
    await pool.query('DELETE FROM carts WHERE user_id = $1 AND productId = $2', [userId, productId]);
    res.json({ message: 'Product removed from cart' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};
