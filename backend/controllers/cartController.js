import pool from '../db.js';

export const getCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    await pool.query(
      'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
    res.status(201).json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
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
