import axios from 'axios';

export const fetchProducts = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const fetchProductById = async (req, res) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};
